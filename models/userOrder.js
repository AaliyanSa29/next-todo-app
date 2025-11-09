import mongoose from "mongoose";

const UserOrderSchema = new mongoose.Schema({
  username: String,
  email: String,
  instructions: String,
  paymentStatus: {
    type: String,
    default: "paid",
  },
  deliveryStatus: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.UserOrder ||
  mongoose.model("UserOrder", UserOrderSchema);
