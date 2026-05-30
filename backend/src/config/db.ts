import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        console.log("MongoDB connected");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};