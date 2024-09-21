import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  image: { type: Array, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, required: true },
  quantity: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default ProductModel;
