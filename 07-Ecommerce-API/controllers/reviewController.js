const Product = require("../models/Product");
const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productID } = req.body;
  const userId = req.user.userId;
  const isValidProduct = await Product.findById(productID);
  if (!isValidProduct) {
    throw new NotFoundError(`Product with id: ${productID} not found`);
  }
  const alreadySubmittedReview = await Review.findOne({
    product: productID,
    user: userId,
  });
  if (alreadySubmittedReview) {
    throw new BadRequestError(
      "You have already submitted a review for this product"
    );
  }
  req.body.user = userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name price company",
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id).populate({
    path: "product",
    select: "name price company",
  });
  if (!review) {
    throw new NotFoundError(`Review with id: ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment, title } = req.body;
  const review = await Review.findById(id);
  if (!review) {
    throw new NotFoundError(`Review with id: ${id} not found`);
  }
  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.comment = comment;
  review.title = title;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    throw new NotFoundError(`Review with id: ${id} not found`);
  }
  checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};

const getSingleProductReview = async (req, res) => {
  const { id: productID } = req.params;
  const reviews = await Review.find({ product: productID });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReview,
};
