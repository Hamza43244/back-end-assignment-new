const express = require("express");
const route = express.Router();
const teacherModel = require("../models/folder/teacherModel");
const { sendResponse } = require("../models/folder/helper");

route.get("/", async (req, res) => {
  try {
    const result = await teacherModel.find();
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
    const teacher = await teacherModel.findById(req.params.id);
    if (!teacher) {
      res.send(sendResponse(false, null, "No teacher found")).status(404);
    } else {
      res.send(sendResponse(true, teacher, "teacher found")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

route.post("/", async (req, res) => {
  const {name,course ,contact} = req.body;
  console.log(req.body)
  try {
    let errArr = [];
    if (!name) {
      errArr.push("Required: Name");
    }
    if (!course) {
        errArr.push("Required: Course");
    }
    if (!contact) {
      errArr.push("Required: Contact");
    }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
    } else {
      const teacher = new teacherModel({
        name,
        course,
        contact,
      });
      const savedStudent = await teacher.save();
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
    const deletedTeacher = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      res.send(sendResponse(false, null, "No teacher found")).status(404);
    } else {
      res.send(sendResponse(true, null, "teacher deleted")).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(500);
  }
});

module.exports = route;





