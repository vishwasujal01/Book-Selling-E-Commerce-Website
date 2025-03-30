// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
//       console.log("API Response:", response.data.orders);

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   // Log orders whenever they change
//   useEffect(() => {
//     console.log(orders);
//   }, [orders]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div key={index}>
//             <img src={assets.parcel_icon} alt="" />
//             <div>

//             <div>
//               {
//                 order.items.map((item, itemIndex) => (          
//                      <p key={itemIndex}>{item.name} x {item.quantity} <span>{item.size}</span></p>
//                 ))
//               }
//             </div>
//             <p>{order.address.firstName+ " " + order.address.lastName}</p>
//             <div>
//               <p>{order.address.street + ","}</p>
//               <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
//             </div>
//             <p>{order.address.phone}</p>
//           </div>

//           <div>
//             <p>Items: {order.items.length}</p>
//             <p>Method: {order.paymentMethod}</p>
//             <p>payment: {order.payment ? 'Done' : 'pending'}</p>
//             <p>Date: { new Date(order.date).toDateString()}</p>
//           </div>

//           <p>{currency} {order.amount}</p>

//           <select>
//             <option value="Order placed">Order placed</option>
//             <option value="Packing">Packing</option>
//             <option value="Shipping">Shipping</option>
//             <option value="Out for Delivery">Out for Delivery</option>
//             <option value="Delivered">Delivered</option>
//           </select>

//           </div>

//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      console.log("API Response:", response.data.orders);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {

      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      
      if (response.data.success) {
        await fetchAllOrders();
      }
      
    } catch (error) {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Log orders whenever they change
  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <img className='w-12' src={assets.parcel_icon} alt="" />

          <div>

            <div>
              {
                order.items.map((item, itemIndex) => (          
                     <p className='py-1' key={itemIndex}>{item.name} x {item.quantity}</p>
                ))
              }
            </div>
            <p className='mt-3 mb-2 font-medium'>{order.address.firstName+ " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
            </div>
            <p>{order.address.phone}</p>

        </div>

          <div>
            <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
            <p className='mt-3'>Method: {order.paymentMethod}</p>
            <p>payment: {order.payment ? 'Done' : 'pending'}</p>
            <p>Date: { new Date(order.date).toDateString()}</p>
          </div>

          <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>

          <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold bg-white border rounded-md  border-black'>
            <option value="Order placed">Order placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipping">Shipping</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select> 

          </div>

        ))}
      </div>
    </div>
  );
};

export default Orders;