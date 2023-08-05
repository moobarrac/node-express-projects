const express = require("express");
const router = express.Router();
const {
  authentiacteUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authentiacteUser, authorizePermissions("admin"), getAllUsers);
router.route("/showMe").get(authentiacteUser, showCurrentUser);
router.route("/updateUser").patch(authentiacteUser, updateUser);
router.route("/updateUserPassword").patch(authentiacteUser, updateUserPassword);
router.route("/:id").get(authentiacteUser, getSingleUser);

module.exports = router;
