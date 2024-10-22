import express from "express";
import db from "../config/dbConnect.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { isValidText } from "../util/validation.js";
import { checkAuth } from "../util/auth.js";

const router = express.Router();
router.use(checkAuth);

router.get(
  "/product",
  authorizeRoles("admin", "employee"),
  async (req, res) => {
    // ---------  Session ---------
    // if (!req.session.userId) {
    //   throw { message: "Auth fail" };
    // }

    // try {
    //   const results = await db.query("SELECT * FROM product");

    //   if (results.rows.length === 0) {
    //     return res.status(404).json({ message: "Data not found" });
    //   }

    //   return res.json(results.rows);
    // } catch (err) {
    //   console.error("Error querying database: ", err);
    //   return res.status(500).json({ message: "Internal server error" });
    // }

    // --------- JWT Token ---------
    try {
      const data = req.query;
      let query;
      let values = [];

      if (data.prodId) {
        // If prodId is provided in the query, filter by prodId
        query = "SELECT * FROM product WHERE prod_id = $1";
        values = [data.prodId];
      } else {
        // If prodId is not provided, select all products
        query = "SELECT * FROM product";
      }
      // Execute the query
      const result = await db.query(query, values);

      if (result.rows.length > 0) {
        // Return the result as JSON
        return res.json({ results: result.rows });
      }

      return res.status(404).json({ message: "Not found" });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

router.post(
  "/product",
  authorizeRoles("admin", "employee"),
  async (req, res) => {
    console.log("Start API Add Product");

    let errors = {};
    let isValid = true;
    try {
      // if (!req.session.userId) {
      //   throw { message: "Auth fail" };
      // }

      /// Get product input
      const data = req.body;
      /// Validate category input
      if (data.categoryId === "undefined") {
        errors.prodNameTh = "Please enter Category";
        isValid = false;
      }

      if (!isValidText(data.prodNameTh)) {
        errors.prodNameTh = "Please enter Product name(TH)";
        isValid = false;
      }

      if (!isValidText(data.prodNameEn)) {
        errors.prodNameEn = "Please enter Product name(TH)";
        isValid = false;
      }

      if (!isValidText(data.prodCost.toString())) {
        errors.prodCost = "Please enter Cost";
        isValid = false;
      }

      if (!isValidText(data.quatity.toString())) {
        errors.quatity = "Please enter Quatity";
        isValid = false;
      }

      if (!isValidText(data.available.toString())) {
        errors.available = "Please enter Available";
        isValid = false;
      }

      if (!isValidText(data.tax.toString())) {
        errors.tax = "Please enter Tax";
        isValid = false;
      }

      if (isValid === false) {
        return res.status(422).json({
          message: "Adding the product failed due to validation errros.",
          errors: errors,
        });
      }

      /// check if product already exist
      const checkProduct = await db.query(
        "SELECT * FROM product where prod_name_th = $1 or prod_name_en = $2",
        [data.prodNameTh, data.prodNameEn]
      );
      /// Validate if category exist in our database
      if (checkProduct.rows.length > 0) {
        return res
          .status(409)
          .json({ message: "Product already exist." });
      }

      /// Save product in db
      const result = await db.query(
        "INSERT INTO product(category_id, created_by, updated_by, prod_name_th, prod_name_en, desc_th, desc_en, prod_cost, quatity, available, tax, remark) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [
          data.categoryId,
          "admin",
          "admin",
          data.prodNameTh,
          data.prodNameEn,
          data.descTh,
          data.descEn,
          data.prodCost,
          data.quatity,
          data.available,
          data.tax,
          data.remark,
        ]
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
