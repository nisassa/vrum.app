import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useProfile } from '../../hooks/profile';

function Login() {

  const { userLogin } = useProfile();

  const handleOnSubmit = (values, actions) => {
    userLogin(values)
  };


  return (
    <div className='container my-4 mx-auto px-4 md:px-12'>
      <div className='flex w-full justify-center items-center bg-yellow-400 p-4 mb-4'>
        <div className='back flex-1 flex justify-start '>
          <Link
            className='w-30 py-2 px-4 my-4 bg-gray-300 text-black font-semibold rounded-lg '
            to='/register'
          >
            Back
          </Link>
        </div>

        <h1 className='flex-1 text-white'>Login Page</h1>
        <div className='flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-blue-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(values) => {
              // console.log(values);
              // alert(JSON.stringify(values, null, 2));
              handleOnSubmit(values);
            }}
          >
            <Form className='flex flex-wrap justify-center' method='POST'>
              <div className='w-full md:w-1/3 security'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Login
                </h3>

                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email
                  </label>
                  <Field
                    name='email'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='email-input'
                    type='email'
                    placeholder='user@domain.com'
                  />
                </div>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='password-input'
                  >
                    Password
                  </label>
                  <Field
                    name='password'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-password'
                    type='password'
                    placeholder='******************'
                  />
                  <Link className='w-full flex' to='/register'>
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded'
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Login;
