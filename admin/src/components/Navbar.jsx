import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img 
        className='w-24 h-24' 
        src='https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-14561.jpg' 
        alt="Company Logo" 
      />
      <button 
        onClick={token ? logout : () => navigate('/login')} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        {token ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
