const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["office", "kitchen", "bedroom"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description must be less than 1000 characters"],
    },
    image: {
      type: String,
      default: "./uploads/example.jpeg",
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: [true, "Colors is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Inventory is required"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", ProductSchema);
