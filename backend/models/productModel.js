import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    bestseller: {type: Boolean},
    date: {type: Number, required: true}
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema) //when product model is available it will use it otherwise it will create a new one

export default productModel