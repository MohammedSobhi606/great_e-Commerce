import express from "express";
import {
  placeOrder,
  getOrders,
  getOrdersByCustomer,
  placeOrderWithRazorpay,
  placeOrderWithstripe,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/OrderController.js";
import adminauth from "../middlewares/adminauth.js";
import auth from "../middlewares/auth.js";

const orderRouter = express.Router();

// get orders by admin

orderRouter.get("/Order_list_admin", getOrders); // get req
// update order status with admin
orderRouter.post("/update_status", adminauth, updateOrderStatus);
// payment request with user

orderRouter.post("/place", auth, placeOrder);

// payment request with razorpay

orderRouter.post("/razorpay", placeOrderWithRazorpay);

// payment request with stripe

orderRouter.post("/stripe", auth, placeOrderWithstripe);
orderRouter.post("/stripeVerify", auth, verifyOrder);

// get orders by customer

orderRouter.get("/Order_list_user", auth, getOrdersByCustomer); // get req

export default orderRouter;

// place order, get orders, get orders by customer, place order with razorpay, place order with stripe, update order status with admin, get orders by customer.
