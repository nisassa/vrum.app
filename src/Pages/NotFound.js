import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className='container h-screen flex flex-col justify-center items-center mx-auto my-4 mt-1o px-4 md:px-12'>
        <div className='bg-yellow-400 p-4 mb-4'>
          <h1 className='text-8xl'>404</h1>
          <h3 className='w-full text-center text-white'>
            Sorry Page Not Found!
          </h3>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
          <Link to={'/'}>Return to Home</Link>
        </button>
      </div>
    </>
  );
}
export default NotFound;
