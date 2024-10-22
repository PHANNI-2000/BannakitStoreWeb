import express from "express";
import db from "../config/dbConnect.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { isValidText } from "../util/validation.js";
import { checkAuth } from "../util/auth.js";

const router = express.Router();

router.use(checkAuth);

router.get(
  "/category",
  authorizeRoles("admin", "employee"),
  async (req, res) => {
    console.log("Start API category");

    // if (!req.session.userId) {
    //   throw { message: "Auth fail" };
    // }

    try {
      const results = await db.query("SELECT * FROM category");

      if (results.rows.length > 0) {
        return res.json({ results: results.rows });
      }

      return res.status(404).json({ message: "Not found" });
    } catch (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/category",
  authorizeRoles("admin", "employee"),
  async (req, res) => {
    try {
      if (!req.session.userId) {
        throw { message: "Auth fail" };
      }

      /// Get category input
      const { categoryNameTh, categoryNameEn, activeStatus } = req.body;
      /// Validate category input
      if (!(isValidText(categoryNameTh) && isValidText(categoryNameEn))) {
        return res.status(400).json({ message: "All input is required" });
      }

      /// check if category already exist
      const checkCategory = await db.query(
        "SELECT * FROM category where category_name_th = $1 or category_name_en = $2",
        [categoryNameTh, categoryNameEn]
      );
      /// Validate if category exist in our database
      if (checkCategory.rows.length > 0) {
        return res
          .status(409)
          .json({ message: "Category already exist. Please input data." });
      }
      /// Save category in db
      const result = await db.query(
        "INSERT INTO category(created_by, updated_by, category_name_th, category_name_en, active_status) VALUES ($1, $2, $3, $4, $5)",
        ["admin", "admin", categoryNameTh, categoryNameEn, activeStatus]
      );
      /// return api response
      return res
        .status(201)
        .json({ message: "Saved successfully", results: result.rows[0] });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Someting went wrong", error: err.message });
    }
  }
);

export default router;
