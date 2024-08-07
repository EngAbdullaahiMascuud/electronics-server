const db = require("../db/db.config");
const express = require("express");
const multer = require("multer");
const path= require("path")
const cr = require("crypto")

module.exports = {
  readFoodMenu: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where foods.status='yes'";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        return res.send({
          status: false,
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        status: true,
        data: result,
      });
    });
  },
  readFoodsForAdmins: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        return res.send({
          status: false,
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        status: true,
        data: result,
      });
    });
  },
  checkFoodName: function (req, res) {
    var sql = "Select *from foods where food_name=?";
    db.getConnection.query(sql, [req.body.name], (err, result) => {
      if (err) {
        return res.send({
          status: false,
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        status: true,
        data: result,
      });
    });
  },
  readFoodBasedCategories: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where categories.name=? AND foods.status='yes'";

    db.getConnection.query(sql, [req.body.category], (err, result) => {
      if (err) {
        return res.send({
          status: false,
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        status: true,
        data: result,
      });
    });
  },
  fetchSingle: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where foods.category_id=?";
    db.getConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.send({
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        data: result,
      });
    });
  },
  uploadFoodImage: (req, res) => {
    var multerStg = multer.diskStorage({
      destination: "./public/uploads",
      filename: (req, file, cb) => {
        cb(null, `${cr.randomUUID()}${path.extname(file.originalname)}`);
      },
    });

    const uploader = multer({
      storage: multerStg,
    });
    return uploader;
  },
  active: (req, res) => {
    const { status, id } = req.body;
    var sql = "UPDATE foods SET status=? WHERE id=?";

    db.getConnection.query(sql, [status, id], (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        message: "order status Has been updated successfully ✔",
      });
    });
  },
  insertIntoFoodMenu: function (req, res) {
    const { name, price, category_id,description } = req.body;
    var sql =
      "Insert into foods (food_name, price, category_id, image, status,eDescription) VALUE (?,?,?,?,?,?)";
    db.getConnection.query(
      sql,
      [name, price, category_id, req.file.filename, "yes",description],
      (err, result) => {
        if (err) {
          return res.send({
            status: false,
            message: "There is an error occured!",
            description: err.message,
            errorCode: err.code,
          });
        }

        return res.send({
          status: true,
          data: result,
          message: "Food " + name + " Successfully Created",
        });
      }
    );
  },
  updateFoodMenu: function (req, res) {
    const { id } = req.params;
    const { name, price, category_id, default_image,description } = req.body;

    var sql =
      "Update foods set food_name = ?, price = ?, category_id = ?, image = ?,eDescription=? WHERE id = ?";
    db.getConnection.query(
      sql,
      [
        name,
        price,
        category_id,
        req.file ? req.file.filename : default_image,
        description,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "There is an error occurred!",
            description: err.message,
            errorCode: err.code,
          });
        }

        return res.send({
          data: result,
          message: "menu have been updated",
        });
      }
    );
  },

  deleteMenu: function (req, res) {
    const { food_id } = req.params;
    console.log("ths is delete header")
    var sql = "Delete FROM foods where id= ?";
    db.getConnection.query(sql, [food_id], (error, result) => {
      console.log("ths is delete inner header")
      if (error) {
        console.log("ths is delete inside error ")
        return res.status(500).json({
          message: "There is an error occured!",
          description: error.message,
          errorCode: error.code,
        });
      }
      console.log("ths is delete outer header")
      return res.send({
        data: result,
        message: `You have successfully deleted data with the ID: ${food_id}`,
      });
    });
  },
};
