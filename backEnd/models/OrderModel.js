import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "order placed" },
  paymentMethode: { type: String, required: true, default: "COD" },
  payment: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now },
});
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
