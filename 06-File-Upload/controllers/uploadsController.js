const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { CustomAPIError, BadRequestError } = require("../errors");
const { log } = require("console");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//upload image to public
// const upLoadProductImage = async (req, res) => {
//   const maxSize = 1024 * 1024 * 5;
//   if (!req.files) {
//     throw new BadRequestError("No file uploaded");
//   }
//   const productImage = req.files.image;
//   if (!productImage.mimetype.startsWith("image")) {
//     throw new BadRequestError("Please upload an image");
//   }
//   if (productImage.size > maxSize) {
//     throw new BadRequestError("Please upload an image less than 5MB");
//   }
//   const imagePath = path.join(
//     __dirname,
//     "../public/uploads",
//     productImage.name
//   );

//   await productImage.mv(imagePath);

//   return res.status(StatusCodes.OK).json({
//     image: { src: `/uploads/${productImage.name}` },
//   });
// };

//upload image to cloudinary
const upLoadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  upLoadProductImage,
};
