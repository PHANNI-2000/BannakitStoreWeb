import express from "express";
import bcrypt from "bcrypt";
import db from "../config/dbConnect.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { checkAuth } from "../util/auth.js";
import { isValidText } from "../util/validation.js";

const router = express.Router();
const saltRound = 10;

router.use(checkAuth);

router.get("/management", authorizeRoles("admin"), async (req, res) => {
  // const data = req.query;

  // if (!data.userId) {
  //   return res.status(400).json({ message: "User ID is required" });
  // }

  try {
    // Select employee
    // const result = await db.query("SELECT * FROM employee where user_id = $1", [
    //   data.userId,
    // ]);

    const result = await db.query("SELECT * FROM employee");

    if (result.rows.length > 0) {
      return res.json({ results: result.rows });
    }

    return res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      error: err,
    });
  }
});

router.post("/management", authorizeRoles("admin"), async (req, res) => {
  const data = req.body;
  let errors = {};

  if (!isValidText(data.username)) {
    errors.username = "Invalid username";
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (!isValidText(data.firstName)) {
    errors.firstName = "Invalid First name";
  }

  if (!isValidText(data.lastName)) {
    errors.lastName = "Invalid Last name";
  }

  // Date of birth
  if (!isValidText(data.dateOfBirth.toString())) {
    errors.dateOfBirth = "Invalid Birthday";
  }

  // Gender
  if (!isValidText(data.gender)) {
    errors.gender = "Invalid Gender";
  }

  // Salary
  if (!isValidText(data.salary.toString())) {
    errors.salary = "Invalid Salary";
  }

  // Active status

  // Tel
  if (!isValidText(data.tel.toString())) {
    errors.tel = "Invalid Tel";
  }

  // Hire date
  if (!isValidText(data.hireDate.toString())) {
    errors.hireDate = "Invalid Hire date";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the user failed due to validation errors.",
      errors,
    });
  }

  try {
    // check if user already exist
    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [data.username]
    );

    /// Validate if user exist in our database
    if (checkUser.rows.length > 0) {
      return res.status(409).send("User already exist. Please login");
    } else {
      // Encrypt user password
      await bcrypt.hash(data.password, saltRound, async (err, hash) => {
        if (err) {
          console.log("Error hashing password: ", err);
        } else {
          // Save user in db table user becuase We need get user_id
          const addUser = await db.query(
            "INSERT INTO users (created_by, updated_by, username, password, role_id) values ($1, $2, $3, $4, $5) RETURNING *",
            ["admin", "admin", data.username, hash, 3]
          );

          let checkResult = false;
          // check if insert success
          if (addUser.rows[0]) {
            /// Get user_id from variable addUser and Save employee in db
            const result = await db.query(
              "INSERT INTO employee(created_by, updated_by, user_id, first_name, last_name, date_of_birth, gender, salary, active_status, tel, hire_date, issue_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
              [
                "admin",
                "admin",
                addUser.rows[0].user_id,
                data.firstName,
                data.lastName,
                data.dateOfBirth,
                data.gender.toLowerCase(),
                data.salary,
                data.activeStatus ?? true,
                data.tel,
                data.hireDate,
                data.issueDate,
              ]
            );
            /// after successful recording, check the returned data as boolean.
            if (result.rows[0]) {
              checkResult = true;
            }
          }

          /// if cheackResult is "true", the status will be 201
          if (checkResult) {
            // const authToken = createJSONToken(
            //   addUser.username,
            //   addUser.role_id
            // );

            // return new user
            return res.status(201).json({
              message: "Saved successfully",
              //   // user: userData,
              // token: authToken,
            });
          }
        }
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

// module.exports ส่งออกค่าหนึ่งค่าหรือวัตถุทั้งหมด
// exports ใช้เพื่อเพิ่มคุณสมบัติให้กับวัตถุที่ถูกส่งออก
export default router;
