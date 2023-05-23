const express = require("express");
const route = express.Router();
const courseModel = require("../models/folder/courseModel");
const { sendResponse } = require("../models/folder/helper");

route.get("/", async (req, res) => {
  try {
    const result = await courseModel.find();
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
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      res.send(sendResponse(false, null, "No course found")).status(404);
    } else {
      res.send(sendResponse(true, course, "course found")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.post("/", async (req, res) => {
  const {name,duration  ,fee,shortName} = req.body;
  console.log(req.body)
  try {
    let errArr = [];
    if (!name) {
      errArr.push("Required: Name");
    }
    if (!duration) {
        errArr.push("Required: duration");
    }
    if (!fee) {
        errArr.push("Required: fee");
      }
    if (!shortName) {
      errArr.push("Required: shortName");
    }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
    } else {
      const course = new courseModel({
        name,
        duration,
        fee,
        shortName,
      });
      const savedCourse = await course.save();
      res.send(sendResponse(true, savedCourse, "Saved Successfully")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const course = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) {
      res.send(sendResponse(false, null, "No course found")).status(404);
    } else {
      res.send(sendResponse(true, student, "course updated")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await instituteModel.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      res.send(sendResponse(false, null, "No course found")).status(404);
    } else {
      res.send(sendResponse(true, null, "course deleted")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

module.exports = route;





