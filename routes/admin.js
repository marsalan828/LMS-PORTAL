var express = require("express");
var router = express.Router();
const checkRole = require("../middleware/checkRole");
const AdminController = require("../controller/AdminController");
const checkAuth = require("../middleware/checkAuth");

router.use(checkAuth);

// Create a new user
router.post("/", checkRole("admin"), AdminController.createUser);
// fetch all users in the db
router.get("/", checkRole("admin"), AdminController.getAllUsers);
// delete a user
router.delete("/:id", checkRole("admin"), AdminController.deleteUser);

module.exports = router;