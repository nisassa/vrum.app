import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

function RegisterProvider() {
  return (
    <div className='container my-4 mx-auto px-4 md:px-12'>
      <div className='bg-yellow-400 p-4 mb-4'>
        <h1 className='text-white'>Register Provider</h1>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-red-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: ''
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <form className='flex flex-wrap'>
              <div className='w-full md:w-1/3 personal-details px-3'>
                <h3 className='mb-3'>Your details</h3>
                <div className='flex flex-wrap -mx-3 mb-6'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      First Name
                    </label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                      id='grid-first-name'
                      type='text'
                      placeholder='Jane'
                    />
                    <p className='text-red-500 text-xs italic'>
                      Please fill out this field.
                    </p>
                  </div>
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Last Name
                    </label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-last-name'
                      type='text'
                      placeholder='Doe'
                    />
                  </div>
                </div>
                <div className='w-full'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-last-name'
                  >
                    Last Name
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-last-name'
                    type='text'
                    placeholder='Doe'
                  />
                </div>
              </div>
              <div className='w-full md:w-1/3 contact-datails px-3'>
                <h3 className='mb-3'>Contact details</h3>
                <div className='flex flex-wrap -mx-3 mb-2'>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-city'
                    >
                      City
                    </label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-city'
                      type='text'
                      placeholder='Albuquerque'
                    />
                  </div>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-state'
                    >
                      State
                    </label>
                    <div className='relative'>
                      <select
                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='grid-state'
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-zip'
                    >
                      Zip
                    </label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-zip'
                      type='text'
                      placeholder='90210'
                    />
                  </div>
                </div>
              </div>
              <div className='md:basics-1 security'>
                <h3 className='mb-3'>Security</h3>

                <div className='flex flex-wrap -mx-3 mb-6'>
                  <div className='w-full px-3'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-password'
                      type='password'
                      placeholder='******************'
                    />
                    <p className='text-gray-600 text-xs italic'>
                      Make it as long and as crazy as you'd like
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default RegisterProvider;
