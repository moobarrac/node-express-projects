const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authentiacteUser } = require("../middleware/authentication");

router.route("/").get(getAllReviews).post(authentiacteUser, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authentiacteUser, updateReview)
  .delete(authentiacteUser, deleteReview);

module.exports = router;
