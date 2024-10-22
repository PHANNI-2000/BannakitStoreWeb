import express from "express";
import db from "../config/dbConnect.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { checkAuth } from "../util/auth.js";

const router = express.Router();
router.use(checkAuth);

// Only admin can access this router
router.get("/admin", authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Both admin and employee can access this router
router.get("/employee", authorizeRoles("admin", "employee"), (req, res) => {
  res.json({ message: "Welcome Employee" });
});

// All can access this router
router.get("/user", authorizeRoles("admin", "employee", "user"), (req, res) => {
  res.json({ message: "Welcome User" });
});

router.get("/test", async (req, res) => {
  // if (!req.session.userId) {
  //   throw { message: "Auth fail" };
  // }

  // const results = await db.query("SELECT * FROM users");
  // res.json(results.rows);

  const data = req.query;
  console.log(data);

  if (!data.userId) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  try {
    const result = await db.query("SELECT * FROM users where user_id = $1", [
      data.userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
