const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
