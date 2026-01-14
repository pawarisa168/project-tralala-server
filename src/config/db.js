import mongoose from "mongoose";

  const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, { dbName: "git-status-tralala" });
    console.log("MongoDB connected ❤️");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
}

export default connectDB;