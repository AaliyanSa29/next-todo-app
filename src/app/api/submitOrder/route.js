// app/api/submitOrder/route.js
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { connectDB } from "../../../../lib/connectDB";
import UserOrder from "../../../../models/userOrder";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { username, email, instructions, productId, title, price, image } =
      await req.json();

    console.log("📦 Order received:", { username, email, productId, title });

    // Validate required fields
    if (!email || !productId || !title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // 2️⃣ Save to MongoDB
    const mongoOrder = await UserOrder.create({
      username: username || "Anonymous",
      email,
      instructions: instructions || "",
      productId,
      productTitle: title,
      price: parseFloat(price) || 0,
      image,
      paymentStatus: "paid",
      deliveryStatus: "pending",
      createdAt: new Date(),
    });

    console.log("✅ Saved to MongoDB:", mongoOrder._id);

    // 3️⃣ Sync to Sanity
    const sanityToken = process.env.SANITY_API_TOKEN;
    let sanityId = null;

    if (!sanityToken) {
      console.warn("⚠️ SANITY_API_TOKEN not found - skipping Sanity sync");
    } else {
      try {
        const sanity = createClient({
          projectId: "f3aif6e4",
          dataset: "production",
          token: sanityToken,
          useCdn: false,
          apiVersion: "2023-01-01",
        });

        const sanityOrder = await sanity.create({
          _type: "userOrder",
          username: username || "Anonymous",
          email,
          instructions: instructions || "",
          productId,
          productTitle: title,
          price: parseFloat(price) || 0,
          image,
          paymentStatus: "paid",
          deliveryStatus: "pending",
          mongoId: mongoOrder._id.toString(),
          createdAt: new Date().toISOString(),
        });

        sanityId = sanityOrder._id;
        console.log("✅ Synced to Sanity:", sanityId);
      } catch (sanityError) {
        console.error("❌ Sanity sync failed:", sanityError.message);
        // Continue - don't fail the order if Sanity sync fails
      }
    }

    // 4️⃣ Send Confirmation Email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Email HTML template
        const emailHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .order-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .order-box h2 { margin-top: 0; color: #667eea; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .detail-label { font-weight: bold; color: #6b7280; }
              .detail-value { color: #111827; }
              .detail-value-1 { color : #55AB5El; font-weight: bold;}
              .price { font-size: 24px; font-weight: bold; color: #84cc16; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Thank You for Your Order!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Your order has been confirmed</p>
              </div>
              
              <div class="content">
                <p>Dear ${username || "Valued Customer"},</p>
                
                <p>Thank you for choosing <strong>Neosour</strong>! We're excited to work on your project.</p>
                
                <div class="order-box">
                  <h2>📦 Order Details</h2>
                  
                  <div class="detail-row">
                    <span class="detail-label">Product: </span>
                    <span class="detail-value"> ${title}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Order ID: </span>
                    <span class="detail-value"> #${mongoOrder._id.toString().slice(-8).toUpperCase()}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Amount Paid: </span>
                    <span class="detail-value-1"> ₨ ${parseFloat(price).toLocaleString()}</span>
                  </div>
                  
                  ${
                    instructions
                      ? `
                  <div class="detail-row">
                    <span class="detail-label">Your Instructions: </span>
                    <span class="detail-value"> ${instructions}</span>
                  </div>
                  `
                      : ""
                  }
                </div>
                
                <h3>📧 What Happens Next?</h3>
                <ul style="line-height: 1.8;">
                  <li>Our team will review your order and requirements</li>
                  <li>Your completed design will be delivered to this email</li>
                  <li>Delivery time: Within 24-48 hours</li>
                  <li>You'll receive updates about your order status</li>
                </ul>
                
                <p style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                  <strong>⏰ Need it faster?</strong> Contact us at <a href="mailto:info@paragonvertex.com" style="color: #667eea;">info@paragonvertex.com</a>
                </p>
                
                <div style="text-align: center;">
                  <a href="mailto:info@paragonvertex.com" class="button">Contact Support</a>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Neosour</strong></p>
                <p>📞 +92 329 9293046 | ✉️ info@paragonvertex.com</p>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
                  This is an automated confirmation email. Please do not reply to this email.
                </p>
              </div>
            </div>
          </body>
          </html>
        `;

        // Send email
        await transporter.sendMail({
          from: `"Neosour" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Thank You for Your Order! 🎉",
          html: emailHTML,
        });

        console.log("✅ Confirmation email sent to:", email);
      } catch (emailError) {
        console.error("⚠️ Email send failed:", emailError.message);
        // Don't fail the order if email fails
      }
    } else {
      console.warn("⚠️ Email credentials not found - skipping email");
    }

    return NextResponse.json({
      success: true,
      orderId: mongoOrder._id,
      sanityId: sanityId,
      message: "Order placed successfully! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("❌ Order submission failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to process order",
      },
      { status: 500 }
    );
  }
}

// // app/api/submitOrder/route.js
// import { NextResponse } from "next/server";
// import { createClient } from "next-sanity";
// import { connectDB } from "../../../../lib/connectDB";
// import UserOrder from "../../../../models/userOrder";

// export async function POST(req) {
//   try {
//     const { username, email, instructions, productId, title, price, image } =
//       await req.json();

//     console.log("📦 Order received:", { username, email, productId, title });

//     // Validate required fields
//     if (!email || !productId || !title) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Connect to MongoDB
//     await connectDB();
//     console.log("✅ MongoDB connected");

//     // 2️⃣ Save to MongoDB
//     const mongoOrder = await UserOrder.create({
//       username: username || "Anonymous",
//       email,
//       instructions: instructions || "",
//       productId,
//       productTitle: title,
//       price: parseFloat(price) || 0,
//       image,
//       paymentStatus: "paid",
//       deliveryStatus: "pending",
//       createdAt: new Date(),
//     });

//     console.log("✅ Saved to MongoDB:", mongoOrder._id);

//     // 3️⃣ Sync to Sanity
//     const sanityToken = process.env.SANITY_API_TOKEN;

//     if (!sanityToken) {
//       console.warn("⚠️ SANITY_API_TOKEN not found");
//       return NextResponse.json({
//         success: true,
//         orderId: mongoOrder._id,
//         warning: "Order saved to MongoDB but not synced to Sanity",
//       });
//     }

//     try {
//       const sanity = createClient({
//         projectId: "f3aif6e4",
//         dataset: "production",
//         token: sanityToken,
//         useCdn: false,
//         apiVersion: "2023-01-01",
//       });

//       const sanityOrder = await sanity.create({
//         _type: "userOrder",
//         username: username || "Anonymous",
//         email,
//         instructions: instructions || "",
//         productId,
//         productTitle: title,
//         price: parseFloat(price) || 0,
//         image,
//         paymentStatus: "paid",
//         deliveryStatus: "pending",
//         mongoId: mongoOrder._id.toString(),
//         createdAt: new Date().toISOString(),
//       });

//       console.log("✅ Synced to Sanity:", sanityOrder._id);

//       return NextResponse.json({
//         success: true,
//         orderId: mongoOrder._id,
//         sanityId: sanityOrder._id,
//         message: "Order placed successfully!",
//       });
//     } catch (sanityError) {
//       console.error("❌ Sanity sync failed:", sanityError.message);

//       return NextResponse.json({
//         success: true,
//         orderId: mongoOrder._id,
//         warning: "Order saved to MongoDB but Sanity sync failed",
//         sanityError: sanityError.message,
//       });
//     }
//   } catch (err) {
//     console.error("❌ Order submission failed:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         error: err.message || "Failed to process order",
//       },
//       { status: 500 }
//     );
//   }
// }
