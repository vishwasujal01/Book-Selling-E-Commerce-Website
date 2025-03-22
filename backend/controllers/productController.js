import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

//function for add product
const addProduct = async (req, res) => {

    try {
        
        const { name, author, description, price, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                console.log("Cloudinary Upload Result:", result); 
                return result.secure_url;
            })
        );

        // Promise.all() ka use multiple asynchronous tasks (Promises) ko parallel me execute karne ke liye hota hai.
        
        console.log("Uploaded Image URLs:", imagesUrl); // Log uploaded URLs
        
        

        const productData = {
            name,
            author,
            description,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        
        await product.save();
        
        res.json({success:true, message: "Product added successfully"});


    } catch (error) { 
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

//function for list product
const listProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export { addProduct, listProducts }; // Export functions to be used elsewhere in the application.