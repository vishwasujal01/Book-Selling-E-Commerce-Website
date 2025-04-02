// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/Book_Store");

//         console.log("Connected to MongoDB Compass");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/Book_Store`)

}

export default connectDB;