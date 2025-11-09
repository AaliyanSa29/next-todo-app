// import mongoose from "mongoose";

// const DB_URI =
//   "mongodb+srv://aaliyansami29_db_user:GRAbTG9xpAkSEMlr@cluster2.i9frhuv.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster2";

// export const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       console.log("Already connected!");
//       return;
//     }
//     await mongoose.connect(DB_URI);
//     console.log("Database connected!");
//   } catch (err) {
//     console.log(err);
//     console.log("Database not connected!");
//     process.exit(1);
//   }
// };

// lib/connectDB.js
// lib/connectDB.js
import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  if (!DB_URI) {
    console.error("❌ Missing MONGODB_URI environment variable");
    throw new Error("Missing MONGODB_URI");
  }

  try {
    const conn = await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(error.message);
    throw new Error("Database connection error");
  }
}
