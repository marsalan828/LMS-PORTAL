var express = require("express");
var router = express.Router();
// const checkRole = require("../middleware/checkRole");
// const AdminController = require("../controller/AdminController");
const checkAuth = require("../middleware/checkAuth");
const CourseController = require("../controller/CourseController");

// router.use(checkAuth);

router.post('/create-course', CourseController.createCourse);
router.get("/get-courses", CourseController.getAllCourses);
router.get("/get-course?:id", CourseController.getCourseById);
router.post("/update-course/:id", CourseController.updateCourse);
router.delete("/delete-course/:id", CourseController.deleteCourse);

module.exports = router;
