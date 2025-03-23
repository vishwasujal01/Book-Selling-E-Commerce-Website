import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({id, image, name, author, price}) => {

   const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
        <img className='w-full h-80 object-cover transition-transform duration-300 hover:scale-110' src={image[0]} alt={name} />        </div>
        <p className='pt-3 font-medium pb-1 text-sm'>{name}</p>
        <p className='pt-3 font-medium pb-1 text-sm'>{author}</p>
        <p className='text-sm font-bold'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
