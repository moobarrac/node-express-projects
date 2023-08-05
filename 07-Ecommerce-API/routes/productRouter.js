const express = require("express");
const router = express.Router();
const {
  authorizePermissions,
  authentiacteUser,
} = require("../middleware/authentication");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const { getSingleProductReview } = require("../controllers/reviewController");

router
  .route("/")
  .get(getAllProducts)
  .post([authentiacteUser, authorizePermissions("admin")], createProduct);
router
  .route("/uploadImage")
  .post([authentiacteUser, authorizePermissions("admin")], uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authentiacteUser, authorizePermissions("admin")], updateProduct)
  .delete([authentiacteUser, authorizePermissions("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReview);

module.exports = router;
