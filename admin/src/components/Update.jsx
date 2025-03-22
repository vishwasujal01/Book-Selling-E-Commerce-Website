import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify'


const Update = ({ token }) => {
  const location = useLocation();
  const product = location.state || {}; // Get the product details

  // Set initial states with default values (prefilled form)
  const [name, setName] = useState(product.name || '');
  const [author, setAuthor] = useState(product.author || '');
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price || '');
  const [bestseller, setBestseller] = useState(product.bestseller || false);

  const [image1, setImage1] = useState(product.image?.[0] || false);
  const [image2, setImage2] = useState(product.image?.[1] || false);
  const [image3, setImage3] = useState(product.image?.[2] || false);
  const [image4, setImage4] = useState(product.image?.[3] || false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("bestseller", bestseller);

        // Sirf naye images add kare
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);

        if (product._id) {
            formData.append("id", product._id);
            const response = await axios.post(backendUrl + "/api/product/update", formData, {headers:{token}});

            if (response.data.success) {
                toast.success("Product updated successfully!");
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Invalid Product ID!");
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
    }
};


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      {/* Image Upload */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : (image1 instanceof File ? URL.createObjectURL(image1) : image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : (image2 instanceof File ? URL.createObjectURL(image2) : image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : (image3 instanceof File ? URL.createObjectURL(image3) : image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : (image4 instanceof File ? URL.createObjectURL(image4) : image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Form Inputs */}
      <div className='w-full'>
        <p className='mb-2'>Book Title</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Book Author</p>
        <input onChange={(e) => setAuthor(e.target.value)} value={author} className='w-full max-w-[500px] px-3 py-2' type="text" required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Book Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' required />
      </div>

      <div>
        <p className='mb-2'>Book Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" required />
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className='w-50 px-8 py-3 mt-4 bg-black text-white'>Update Your Book</button>
    </form>
  );
};

export default Update;
