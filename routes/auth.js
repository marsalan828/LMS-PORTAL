var express = require("express");
var router = express.Router();
const loginController = require("../controller/AuthController/LoginController")

router.post("/", loginController);

module.exports = router;