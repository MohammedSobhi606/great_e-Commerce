import express from "express";
import {
  addToCartDB,
  updateCartDB,
  getUserCartDataDB,
  removeCartItemsDB,
} from "../controllers/CarttController.js";
import auth from "../middlewares/auth.js";
const CartRouter = express.Router();

CartRouter.post("/add", auth, addToCartDB);

CartRouter.post("/update", auth, updateCartDB);

CartRouter.get("/get", auth, getUserCartDataDB);
CartRouter.post("/remove", auth, removeCartItemsDB);

export default CartRouter;
