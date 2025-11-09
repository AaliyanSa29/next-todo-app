// app/api/test-token/route.js
// Create this file to test if your Sanity token is working

import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

export async function GET() {
  try {
    // 1. Check if token exists
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "❌ SANITY_API_TOKEN is missing from .env.local",
          solution: "Add SANITY_API_TOKEN=sk_your_token to .env.local",
        },
        { status: 500 }
      );
    }

    console.log("Token found:", token.substring(0, 10) + "...");

    // 2. Try to connect to Sanity
    const sanity = createClient({
      projectId: "f3aif6e4",
      dataset: "production",
      token: token,
      useCdn: false,
      apiVersion: "2023-01-01",
    });

    // 3. Try a READ operation (should work even with read-only token)
    console.log("Testing READ operation...");
    const products = await sanity.fetch('*[_type == "product"][0..2]');
    console.log("✅ READ successful, found", products?.length, "products");

    // 4. Try a WRITE operation (needs Editor permissions)
    console.log("Testing WRITE operation...");
    const testDoc = await sanity.create({
      _type: "userOrder",
      username: "TEST USER - DELETE ME",
      email: "test@test.com",
      instructions: "This is a test order. Please delete.",
      productId: "test-123",
      productTitle: "Test Product",
      price: 999,
      image: "",
      paymentStatus: "paid",
      deliveryStatus: "pending",
      mongoId: "test-mongo-id",
      createdAt: new Date().toISOString(),
    });

    console.log("✅ WRITE successful! Document ID:", testDoc._id);

    return NextResponse.json({
      success: true,
      message: "✅ Everything is working! Token has WRITE permissions.",
      testDocId: testDoc._id,
      info: "Check your Sanity Studio - you should see a test order. Delete it manually.",
    });
  } catch (error) {
    console.error("❌ Test failed:", error);

    // Check specific error types
    if (error.message?.includes("Insufficient permissions")) {
      return NextResponse.json(
        {
          success: false,
          error: "❌ Token has READ-ONLY permissions",
          solution:
            "Go to Sanity Dashboard → API → Tokens → Create new token with EDITOR permissions",
          details: error.message,
        },
        { status: 403 }
      );
    }

    if (error.message?.includes("Dataset not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "❌ Dataset 'production' not found",
          solution: "Check your Sanity project settings",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
