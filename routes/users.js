var express = require('express');
var router = express.Router();
const UserController = require('../controller/UserController');
const CourseController = require('../controller/CourseController');
const checkAuth = require('../middleware/checkAuth');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.use(checkAuth);

// fetch a user by user's id
router.get("/:id", UserController.getUserById);
// update user
router.put("/:id", UserController.updateUser);

module.exports = router;
