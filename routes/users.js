var express = require('express');
var router = express.Router();
const checkRole = require('../middleware/checkRole');
const UserController = require('../controller/UserController');
const checkAuth = require('../middleware/checkAuth');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.use(checkAuth);

// Create a new user
router.post('/',checkRole("amdin"), UserController.createUser);
// fetch all users in the db
router.get("/",checkRole("admin"), UserController.getAllUsers);
// delete a user
router.delete("/:id",checkRole("admin"), UserController.deleteUser);

// fetch a user by user's id
router.get("/:id", UserController.getUserById);
// update user
router.put("/:id", UserController.updateUser);

module.exports = router;
