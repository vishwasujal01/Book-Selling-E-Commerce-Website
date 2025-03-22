import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bestseller, setBestseller] = useState(false);



    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            
            const formData = new FormData();

            formData.append("name", name)
            formData.append("author", author)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("bestseller", bestseller)


            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setAuthor('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log();
            toast.error(error.message)
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
       
       {/* Select Book images */}
        <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                    <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                    <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                    <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>
            </div>
        </div>



        <div className='w-full'>
            <p className='mb-2'>Book Title</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' id='Book-name' required />
        </div>

        <div className='w-full'>
            <p className='mb-2'>Book Author</p>
            <input onChange={(e) => setAuthor(e.target.value)} value={author} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' id='Author-name' required />
        </div>

        <div className='w-full'>
            <p className='mb-2'>Book description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content here' id='Book-description' required />
        </div>

        <div>
            <p className='mb-2'>Book Price</p>
            <input onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' id="product-price" />
        </div>



        <div className='flex gap-2 mt-2'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type="submit" className='w-50 px-8 py-3 mt-4 bg-black text-white'>ADD YOUR BOOK</button>
    </form>
  )
}

export default Add
