import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useProfile } from '../../hooks/profile';

function Login() {

  const [apiErrors, setApiErrors] = useState({})
  const [loginFailed, setLoginFailed] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const { userLogin, restoreUserAndToken, isAuthenticated } = useProfile();

  const handleSubmit = async (values) => {
    setLoginFailed(false)
    setisLoading(true)
    await userLogin(values)
        .then((response) => {
          setApiErrors({})
          if (typeof response?.data?.token === 'undefined' || response?.data?.token === null) {
            setLoginFailed(true)
          }
          setisLoading(false)
          restoreUserAndToken()
        })
        .catch((error) => {
          setisLoading(false)
          if (error.hasOwnProperty('response') && typeof error.response === 'object' && error.response.hasOwnProperty('data')) {
            let responseData = error.response.data
            if (responseData.hasOwnProperty('errors') && typeof responseData.errors === 'object' && Object.keys(responseData.errors).length > 0) {
              setApiErrors(responseData.errors[0])
            }
          }
        });
  };

  return (
    <div className='container my-4 mx-auto px-4 md:px-12'>
      <div className='bg-yellow-400 p-4 mb-4'>
        <h1 className='w-full text-center text-white'>Login Page</h1>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-gray-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className='flex flex-wrap justify-center' method='POST'>
              <div className='w-full md:w-1/3 security'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Login
                </h3>

                { loginFailed === true && (
                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-2" role="alert">
                      <p className="text-sm">The details you have provided do not match our records.</p>
                    </div>
                )}

                { isAuthenticated === true && (
                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-2" role="alert">
                      <p className="text-sm">Logged in!</p>
                    </div>
                )}

                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email
                  </label>
                  <Field
                    name='email'
                    className={`w-full bg-white border text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700 ${
                        ( apiErrors.hasOwnProperty('email') && typeof apiErrors.email[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`)}`}
                    id='input_email'
                    id='email-input'
                    type='email'
                    placeholder='user@domain.com'
                  />
                  { apiErrors.hasOwnProperty('email') && typeof apiErrors.email[0] !== 'undefined' && (
                      <p className="text-red-500 text-12">
                        {apiErrors.email[0]}
                      </p>
                  )}
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
                      className={`w-full bg-white border text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700 ${
                          ( apiErrors.hasOwnProperty('password') && typeof apiErrors.password[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`)}`}
                      id='input_password'
                      type='password'
                      placeholder='******************'
                  />
                  { apiErrors.hasOwnProperty('password') && typeof apiErrors.password[0] !== 'undefined' && (
                      <p className="text-red-500 text-12">
                        {apiErrors.password[0]}
                      </p>
                  )}
                  <Link className='w-full flex mt-2' to='/forgot-password'>
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <button
                    disabled={isLoading}
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
