import express from "express";
import upload from "../middlewares/multer.js";
import {
  addProduct,
  removeProduct,
  listProducts,
  getsingleProductById,
} from "../controllers/ProductController.js";
import adminauth from "../middlewares/adminauth.js";

const productRouter = express.Router();
productRouter.post(
  "/add",
  adminauth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove/:id", adminauth, removeProduct);
productRouter.post("/single/:Id", adminauth, getsingleProductById);
productRouter.get("/list", listProducts);
export default productRouter;
