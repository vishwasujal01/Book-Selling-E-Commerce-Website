import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Book_Store");

        console.log("Connected to MongoDB Compass");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;
