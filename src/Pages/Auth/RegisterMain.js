import React from 'react';

import { Link } from 'react-router-dom';

function RegisterMain() {
  return (
    <div className='container my-4 mx-auto px-4 md:px-12'>
      <div className='bg-yellow-400 p-4 mb-4'>
        <h1 className='text-white'>Register</h1>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md mb-4 md:mb-0 register-client'>
          <div className='flex items-center px-12 py-8'>
            <div className='flex flex-col items-start ml-4'>
              <h1>Register as a client</h1>
              <Link
                className='py-2 px-4 my-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                to='/register/client'
              >
                Start using the services
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md mb-4 md:mb-0 register-provider'>
          <div className='flex items-center px-12 py-8'>
            <div className='flex flex-col items-start ml-4'>
              <h1>Register as a provider</h1>
              <Link
                className='py-2 px-4 my-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                to='/register/provider'
              >
                Register New Provider
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterMain;
