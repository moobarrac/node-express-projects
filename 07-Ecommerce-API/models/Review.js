const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be less than 100 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: [1000, "Comment must be less than 1000 characters"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: [true, "Product is required"],
      ref: "Product",
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.findByIdAndUpdate(productId, {
      averageRating: Math.ceil(result[0]?.averageRating || 0),
      numOfReviews: Math.ceil(result[0]?.numOfReviews || 0),
    });
  } catch (error) {}
};

ReviewSchema.post("save", async function () {
  await this.constructor.calcAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calcAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
