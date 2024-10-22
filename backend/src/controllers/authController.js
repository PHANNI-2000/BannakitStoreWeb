import bcrypt from "bcrypt";
import db from "../config/dbConnect.js";
import { createJSONToken, isValidPassword } from "../util/auth.js";
import { isValidText } from "../util/validation.js";

const saltRound = 10;

// Register
const register = async (req, res) => {
  console.log("Start API Register");
  // our register logic goes here
  let errors = {};
  try {
    // Get user input
    // const data = req.body; // example: data.email
    const data = req.body;
    /// Validate user input
    if (!(isValidText(data.username) && isValidText(data.password))) {
      // res.status(400).send("All input is required");
      return res.status(400).json({
        message: "All input is required",
      });
    }

    if (!isValidText(data.password, 6)) {
      errors.password =
        "Invalid password. Must be at leasst 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      console.log("User register failed.");
      return res.status(422).json({
        message: "User register failed due to validation errors.",
        errors,
      });
    }

    /// check if user already exist
    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [data.username]
    );

    /// Validate if user exist in our database
    if (checkUser.rows.length > 0) {
      return res.status(409).send("User already exist. Please login");
    } else {
      // return res.status(404).send("Not found User.")
      // Encrypt user password
      await bcrypt.hash(data.password, saltRound, async (err, hash) => {
        if (err) {
          console.log("Error hashing password: ", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (created_by, updated_by, username, password, role_id) values ($1, $2, $3, $4, $5) RETURNING *",
            ["admin", "admin", data.username, hash, 3]
          );

          const userData = result.rows[0] ?? null;
          const authToken = createJSONToken(
            userData.username,
            userData.role_id
          );

          /// save user token
          // userData.token = authToken;
          /// return new user
          res.status(201).json({
            message: "Successfully registered.",
            // user: userData,
            token: authToken,
          });
        }
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// Login
const login = async (req, res) => {
  // our login logic goes here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!isValidText(username)) {
      return res.status(404).json({ message: "Please input username." });
      // return res.status(404).json({ message: "Username not found" });
    }

    // Validate if user exist in our database
    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = checkUser.rows.length > 0 ? checkUser.rows[0] : null;

    if (!user) {
      return res.status(401).json({
        message: "Authentication failed.",
      });
    }

    if (user && (await isValidPassword(password, user.password))) {
      /// ------------------- JWT Token -------------------
      //   // Create token
      const token = createJSONToken(user.username, user.role_id);
      // Save user token
      user.token = token;

      return res.status(200).json({
        message: "login success",
        results: {
          id: user.user_id,
          username: user.username,
          accessToken: user.token,
        },
      });

      /// ------------------- Session -------------------
      // req.session.userId = user.user_id;
      // req.session.user = user;
      // req.query.userId = user.user_id;

      // return res.json({
      //   message: "login success",
      //   sessionID: req.sessionID,
      // });
    }

    return res.status(400).json({
      message: "Invalid Credentials.",
      errors: "Invalid username or password entered.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// module.exports ส่งออกค่าหนึ่งค่าหรือวัตถุทั้งหมด
// exports ใช้เพื่อเพิ่มคุณสมบัติให้กับวัตถุที่ถูกส่งออก
export { register, login };
