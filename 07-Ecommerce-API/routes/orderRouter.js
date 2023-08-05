const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderContoller");
const {
  authentiacteUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authentiacteUser, authorizePermissions("admin"), getAllOrders)
  .post(authentiacteUser, createOrder);
router.route("/showAllMyOrders").get(authentiacteUser, getCurrentUserOrders);
router
  .route("/:id")
  .get(authentiacteUser, getSingleOrder)
  .patch(authentiacteUser, updateOrder);
// .delete(authentiacteUser, deleteOrder);

module.exports = router;
