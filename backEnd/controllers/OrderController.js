// place order for cash on delivery method
import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      status: "pending",
    };
    const newOrder = await orderModel.create(orderData);
    await userModel.findByIdAndUpdate(userId, { cartItems: [] });
    res.status(200).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// place order for stripe payment method

const placeOrderWithstripe = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const { origin } = req.headers;

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethode: "Stripe",
    status: "pending",
    payment: false,
  };

  try {
    const newOrder = await orderModel.create(orderData);
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: { name: item.product_name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,

      line_items: line_items,
      mode: "payment",
    });
    res.json({ message: "Redirect to Stripe", session_url: session.url });
  } catch (error) {
    console.log(error);
  }
};
// verify the order item

const verifyOrder = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartItems: [] });
      res.json({ message: "Payment successful" });
    } else {
      res.json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// place order for razor payment method

const placeOrderWithRazorpay = async (req, res) => {
  res.json("placeOrderWithRazorpay working");
};
// get orders for admin

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ message: "get order successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get orders for particular customer

const getOrdersByCustomer = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({ message: "get order successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update order status

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  placeOrder,
  placeOrderWithstripe,
  placeOrderWithRazorpay,
  getOrders,
  getOrdersByCustomer,
  updateOrderStatus,
  verifyOrder,
};

// place order for cash on delivery method
