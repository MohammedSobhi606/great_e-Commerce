import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { ConnectDB } from "./configs/dbConnect.js";

import userRouter from "./routes/UserRoute.js";
import ConnectCloudinary from "./configs/Cloudinary.js";
import productRouter from "./routes/ProductRoute.js";
import CartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

const app = express();
const port = 5000;

///middleware
app.use(express.json());
app.use(cors());
// db connection
ConnectDB();
// connect to cloudinary server
ConnectCloudinary();
// api endpoints

app.use("/images", express.static("uploads"));
// auth endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Hello,too World!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
