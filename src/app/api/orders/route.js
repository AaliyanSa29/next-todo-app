// app/api/submitOrder/route.js
// SIMPLE VERSION - Only saves to MongoDB (no Sanity needed)

import { NextResponse } from "next/server";
import { connectDB } from "lib/connectDB";
import UserOrder from "models/userOrder";

export async function POST(req) {
  try {
    const { username, email, instructions, productId, title, price, image } =
      await req.json();

    console.log("📦 New order received");

    // Validate
    if (!email || !productId || !title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // Save order to MongoDB
    const order = await UserOrder.create({
      username: username || "Anonymous",
      email,
      instructions: instructions || "",
      productId,
      productTitle: title,
      price: parseFloat(price) || 0,
      image,
      paymentStatus: "paid",
      deliveryStatus: "pending",
    });

    console.log("✅ Order saved:", order._id);

    return NextResponse.json({
      success: true,
      orderId: order._id,
      message: "Order placed successfully!",
    });
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
