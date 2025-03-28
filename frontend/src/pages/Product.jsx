import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');

    const fetchProductData = async () => {
        products.forEach((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    if (!productData) {
        return <p className="text-center py-10">Loading product...</p>;
    }

    return productData ?(
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-screen-xl mx-auto'>
            {/* Product Data */}
            <div className='flex flex-col sm:flex-row gap-12'>
                {/* Product Image Section */}
                <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
                    <div className='flex sm:flex-col overflow-x-auto sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img 
                                key={index} 
                                src={item} 
                                onClick={() => setImage(item)} 
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-1 hover:shadow-lg' 
                                alt='' 
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto border p-2' src={image} alt='' />
                    </div>
                </div>

                {/* Product Info Section */}
                <div className='flex-1'>
                    <p className='font-medium text-2xl mt-2'>{productData.name}</p>
                    <p className=' text-2xl font-medium'>By, {productData.author}</p>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3 5'/>
                        <img src={assets.star_icon} alt="" className='w-3 5'/>
                        <img src= {assets.star_icon} alt="" className='w-3 5'/>
                        <img src={assets.star_icon} alt="" className='w-3 5'/>
                        <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
                        <p className='pl-2'>(122)</p>
                    </div>

                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>
                    <button onClick={() => addToCart(productData._id)}  className='bg-black text-white px-8 py-3 text-sm mt-5 active:bg-gray-700'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>✅ 100% Original product.</p>
                        <p>💰 Cash on delivery is available on this product.</p>
                        <p>🔄 Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className='mt-20'>
                <div className='flex border-b'>
                    <b className='border px-5 py-3 text-sm bg-gray-100'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Review (122)</p>
                </div>
                <div className='border px-6 py-6 text-sm text-gray-500 bg-gray-50'>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>

             {/* Display related products */}
             <RelatedProducts  category={productData.category}/>
        </div>
    ): <div className='opacity-0'></div>
};

export default Product;
