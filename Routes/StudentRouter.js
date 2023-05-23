const express = require("express");
const route = express.Router();
const studentModel = require("../models/studentModel");
const { sendResponse } = require("../models/folder/helper");

route.get("/", async (req, res) => {
  try {
    const result = await studentModel.find();
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
    const student = await studentModel.findById(req.params.id);

    if (!student) {
      res.send(sendResponse(false, null, "No student found")).status(404);
    } else {
      res.send(sendResponse(true, student, "Student found")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.post("/", async (req, res) => {
  const { firstName, lastName, contact, course ,password} = req.body;
  console.log(req.body)
  try {
    let errArr = [];
    if (!firstName) {
      errArr.push("Required: First Name");
    }
    if (!contact) {
      errArr.push("Required: Contact");
    }
    if (!course) {
      errArr.push("Required: Course");
    }
    if (!password) {
      errArr.push("Required: password");
    }
    if (!email) {
      errArr.push("Required: email");
    }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
    } else {
      const student = new studentModel({
        firstName,
        lastName,
        contact,
        course,
        password,
        eamil,
      });
      const savedStudent = await student.save();
      res.send(sendResponse(true, savedStudent, "Saved Successfully")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!student) {
      res.send(sendResponse(false, null, "No student found")).status(404);
    } else {
      res.send(sendResponse(true, student, "Student updated")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      res.send(sendResponse(false, null, "No student found")).status(404);
    } else {
      res.send(sendResponse(true, null, "Student deleted")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

module.exports = route;





