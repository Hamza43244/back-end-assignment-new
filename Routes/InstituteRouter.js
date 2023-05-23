const express = require("express");
const route = express.Router();
const instituteModel = require("../models/folder/instituteModel");
const { sendResponse } = require("../models/folder/helper");

route.get("/", async (req, res) => {
  try {
    const result = await instituteModel.find();
    if (!result) {
      res.send(sendResponse(false, null, "No data found")).status(404);
    } else {
      res.send(sendResponse(true, result, "Data found")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const institute = await instituteModel.findById(req.params.id);
    if (!institute) {
      res.send(sendResponse(false, null, "No institute found")).status(404);
    } else {
      res.send(sendResponse(true, institute, "institute found")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.post("/", async (req, res) => {
  const {name,address ,shortName,tel} = req.body;
  console.log(req.body)
  try {
    let errArr = [];
    if (!name) {
      errArr.push("Required: Name");
    }
    if (!address) {
        errArr.push("Required: address");
    }
    if (!shortName) {
      errArr.push("Required: shortName");
    }
    if (!tel) {
        errArr.push("Required: telephone");
      }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
    } else {
      const institute = new instituteModel({
        name,
        address,
        shortName,
        tel
      });
      const savedInstitute = await institute.save();
      res.send(sendResponse(true, savedInstitute, "Saved Successfully")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const institute = await instituteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!institute) {
      res.send(sendResponse(false, null, "No institute found")).status(404);
    } else {
      res.send(sendResponse(true, student, "institute updated")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deletedInstitute = await instituteModel.findByIdAndDelete(req.params.id);
    if (!deletedInstitute) {
      res.send(sendResponse(false, null, "No institute found")).status(404);
    } else {
      res.send(sendResponse(true, null, "institute deleted")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

module.exports = route;





