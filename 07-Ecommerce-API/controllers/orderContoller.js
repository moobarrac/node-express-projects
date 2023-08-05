const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "fake client secret";
  return {
    client_secret,
    amount,
  };
};

const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length === 0) {
    throw new BadRequestError("Cart is empty");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Tax and shipping fee are required");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new NotFoundError(`Product ${item.product} not found`);
    }
    const { name, image, price, _id } = product;
    const singleItem = {
      amount: item.amount,
      name,
      image,
      price,
      product: _id,
    };
    orderItems = [...orderItems, singleItem];
    subtotal += item.amount * price;
  }

  const total = subtotal + tax + shippingFee;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    cartItems,
    tax,
    shippingFee,
    total,
    subtotal,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError(`Order ${orderId} not found`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError(`Order ${orderId} not found`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
