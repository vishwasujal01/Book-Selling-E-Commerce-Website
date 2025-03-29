import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema) //when user model is available it will use it otherwise it will create a new one

export default userModel; //exporting the model

// Mongoose removes empty objects ({}) by default when saving.
// minimize: false ensures empty objects are stored in the database.
