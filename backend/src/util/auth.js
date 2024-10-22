import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dotenv from "dotenv";

const { sign, verify } = jwt;
dotenv.config();
const KEY = process.env.TOKEN_KEY;

function createJSONToken(username, roleId) {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return sign({ username, role_id: roleId }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  // jwt.verify(token, secretOrPublicKey, [options, callback])
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  // if (req.method === "OPTIONS") {
  //   return next();
  // }

  // if (!req.headers.authorization) {
  //   console.log("NOT AUTH. AUTH HEADER MISSING");
  //   return next(new NotAuthError("Not authenticated."));
  // }

  // // Code Old
  // // const authFragment = req.headers.authorization.split(" ");

  // if (authFragment.length !== 2) {
  //   console.log("NOT AUTH. AUTH HEADER INVALID");
  //   return next(new NotAuthError("Not authenticated."));
  // }

  // const authToken = authFragment[1];
  // try {
  //   const validatedToken = validateJSONToken(authToken);
  //   req.token = validatedToken;
  // } catch (err) {
  //   console.log("NOT AUTH. TOKEN INVALID");
  //   return next(new NotAuthError("Not authenticated."));
  // }

  // New Code
  // const token = req.headers["authorization"]?.split(" ")[1];
  let token;
  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
  }

  try {
    const decoded = validateJSONToken(token);
    req.user = decoded;
    // req.userId = decoded.userId;
    // req.roleId = decoded.roleId;
    // console.log("The decoded user is: ", req.user);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }

  return next();
}

export {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  checkAuthMiddleware as checkAuth,
};
