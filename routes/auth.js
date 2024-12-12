var express = require("express");
var router = express.Router();
const loginController = require("../controller/AuthController/LoginController");
const AdminController = require("../controller/AdminController");


router.post("/login", loginController);

router.post("/signup", AdminController.createUser);

module.exports = router;