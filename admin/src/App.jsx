import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Sidebar from './components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './components/Login'
import { Navigate } from 'react-router-dom';

export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): '');

  useEffect(() => {
    localStorage.setItem('token',token);
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />

      <>
      <Navbar token={token} setToken={setToken}  />
      <hr />

      <div className='flex w-full'>
      {token && <Sidebar />}

        <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-800 text-base'>
        <Routes>
            {/* Redirect if not logged in */}
            <Route path="/login" element={<Login setToken={setToken} />} />
            
            {/* Protected Routes */}
            {token ? (
              <>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                {/* <Route path="/orders" element={<Update token={token} />} /> */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
      </>

    </div>
  )
}

export default App
