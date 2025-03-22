import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            

            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
      fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Product List</p>

      {/* List Table Title */} 

      <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Author</b>
            <b>Price</b>
            <b className='text-center'>Delete</b>
            <b className='text-center'>Update</b>
      </div>

      {/* Product list */}

        {
            list.map((item, index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                    <img className='w-12' src={item.image[0]} alt="" />
                    <p>{item.name}</p>
                    <p>{item.author}</p>
                    <p>{item.price}</p>
                    <p className='md:text-center cursor-pointer text-lg'>X</p>
                    <p className='md:text-center cursor-pointer text-lg'>Edit</p>
                </div>
            ))
        }

      
    </>
  )
}

export default List
