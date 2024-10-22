const express = require("express");
const bcrypt = require("bcrypt"); // นำเข้าไลบรารีสำหรับการเข้ารหัส (hashing) รหัสผ่านหรือข้อมูลอื่น ๆ โดยใช้การเข้ารหัสแบบ bcrypt ซึ่งมีความปลอดภัยสูง
const cors = require("cors");
const session = require("express-session");

const db = require("./config/dbConnect");
const {
  createJSONToken,
  isValidPassword,
  checkAuthMiddleware,
} = require("./util/auth");
// const { isValidEmail, isValidText } = require("./util/validation");
const authRoutes = require("./routes/authRoutes");
// const session = require("express-session");

// Creating an Express application instance
const app = express();
const port = 3000;
// const saltRound = 10;

// Middleware
app.use(express.json()); // convert data in request body is JSON or URL-encoded

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8888"],
  })
); // No domain host1 -> host2

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Default route
app.get("/", async (req, res) => {
  try {
    res.send("Welcome to my User Registration and Login API!");
    // const result = await db.query("SELECT * FROM users");
    // res.json(result.row);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Routes
app.use("/api/auth", authRoutes);

// Register
// app.post("/register", async (req, res) => {
//   console.log("Start API Register");
//   // our register logic goes here
//   let errors = {};
//   try {
//     // Get user input
//     // const data = req.body; // example: data.email
//     const { firstName, lastName, email, password } = req.body;
//     /// Validate user input
//     if (
//       !(
//         isValidEmail(email) &&
//         isValidText(firstName) &&
//         isValidText(lastName) &&
//         isValidText(password)
//       )
//     ) {
//       // res.status(400).send("All input is required");
//       return res.status(400).json({
//         message: "All input is required",
//       });
//     }

//     if (!isValidText(password, 6)) {
//       errors.password =
//         "Invalid password. Must be at leasst 6 characters long.";
//     }

//     if (Object.keys(errors).length > 0) {
//       console.log("User register failed.");
//       return res.status(422).json({
//         message: "User register failed due to validation errors.",
//         errors,
//       });
//     }

//     /// check if user already exist
//     /// Validate if user exist in our database
//     const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     if (checkUser.rows.length > 0) {
//       return res.status(409).send("User already exist. Please login");
//     } else {
//       // return res.status(404).send("Not found User.")
//       // Encrypt user password
//       await bcrypt.hash(password, saltRound, async (err, hash) => {
//         if (err) {
//           console.log("Error hashing password: ", err);
//         } else {
//           const result = await db.query(
//             "INSERT INTO users (created_by, updated_by, firstname, lastname, email, password) values ($1, $2, $3, $4, $5, $6) RETURNING *",
//             ["admin", "admin", firstName, lastName, email.toLowerCase(), hash]
//           );
//           console.log("result: ", result.rows[0]);

//           const createdUser = result.rows[0];
//           const authToken = createJSONToken(createdUser.id, createdUser.email);

//           // save user token
//           // createdUser.token = authToken;
//           // return new user
//           res.status(201).json({
//             message: "User created.",
//             user: createdUser,
//             token: authToken,
//           });
//         }
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   // our login logic goes here
//   try {
//     // Get user input
//     const { email, password } = req.body;
//     // Validate user input
//     if (!(email && password)) {
//       res.status(400).send("All input is required.");
//     }

//     // Validate if user exist in our database
//     const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     const user = checkUser.rows.length > 0 ? checkUser.rows[0] : null;

//     if (user && (await isValidPassword(password, user.password))) {
//       // Create token
//       const token = createJSONToken(user.email, user.role_id);
//       // Save user token
//       user.token = token;
//       res.status(200).json({
//         message: "login success",
//         results: {
//           id: user.id,
//           email: user.email,
//           accessToken: user.token,
//         },
//       });
//     }

//     res.status(400).send("Invalid Credentials.");
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/home", checkAuthMiddleware, (req, res) => {
  res.status(200).send("Welcome");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
