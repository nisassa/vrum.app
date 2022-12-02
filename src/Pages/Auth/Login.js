import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/profile';
import LoadingSvg from '../../components/LoadingSvg';
import AuthImage from '../../images/bg-login.jpeg';
import AuthDecoration from '../../images/auth-decoration.png';

function Login() {
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { userLogin, restoreUserAndToken, isAuthenticated, isServiceProvider } =
    useProfile();

  const handleSubmit = async (values) => {
    setLoginFailed(false);
    setisLoading(true);
    await userLogin(values)
      .then((response) => {
        setApiErrors({});
        if (
          typeof response?.data?.token === 'undefined' ||
          response?.data?.token === null
        ) {
          setLoginFailed(true);
        }
        setisLoading(false);
        restoreUserAndToken();
      })
      .catch((error) => {
        setisLoading(false);
        if (
          error.hasOwnProperty('response') &&
          typeof error.response === 'object' &&
          error.response.hasOwnProperty('data')
        ) {
          let responseData = error.response.data;
          if (
            responseData.hasOwnProperty('errors') &&
            typeof responseData.errors === 'object' &&
            Object.keys(responseData.errors).length > 0
          ) {
            setApiErrors(responseData.errors[0]);
          }
        }
      });
  };

  if (isAuthenticated && isServiceProvider) {
    navigate('/provider');
  }

  if (isAuthenticated && !isServiceProvider) {
    navigate('/client');
  }

  return (
    <>
      <main className='bg-white'>
        <div className='relative md:flex'>
          {/* Content */}
          <div className='w-full'>
            <div className='min-h-screen h-full flex items-center'>
              {/* Header */}

              <div className='max-w-sm mx-auto px-4 py-8'>
                <h1 className='text-3xl text-slate-800 font-bold mb-6'>
                  Welcome back! ✨
                </h1>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form className='' method='POST'>
                    <div className='space-y-4'>
                      {loginFailed === true && (
                        <div
                          className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-2'
                          role='alert'
                        >
                          <p className='text-sm'>
                            The details you have provided do not match our
                            records.
                          </p>
                        </div>
                      )}

                      {isAuthenticated === true && (
                        <div
                          className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-2'
                          role='alert'
                        >
                          <p className='text-sm'>Logged in!</p>
                        </div>
                      )}

                      <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                        <label
                          className='block text-sm font-medium mb-1'
                          htmlFor='grid-password'
                        >
                          Email
                        </label>
                        <Field
                          name='email'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('email') &&
                            typeof apiErrors.email[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='input_email'
                          type='email'
                          placeholder='user@domain.com'
                        />
                        {apiErrors.hasOwnProperty('email') &&
                          typeof apiErrors.email[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.email[0]}
                            </p>
                          )}
                      </div>

                      <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                        <label
                          className='block text-sm font-medium mb-1'
                          htmlFor='password-input'
                        >
                          Password
                        </label>
                        <Field
                          name='password'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('password') &&
                            typeof apiErrors.password[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='input_password'
                          type='password'
                          placeholder='***'
                        />
                        {apiErrors.hasOwnProperty('password') &&
                          typeof apiErrors.password[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.password[0]}
                            </p>
                          )}

                        <div className='w-full flex items-center justify-between mt-6'>
                          <div className='mr-1'>
                            <Link
                              className='text-sm underline hover:no-underline'
                              to='/forgot-password'
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <button
                            disabled={isLoading ? true : undefined}
                            type='submit'
                            className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap px-10'
                          >
                            {isLoading || isAuthenticated ? (
                              <LoadingSvg />
                            ) : (
                              'Login'
                            )}
                          </button>{' '}
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
                {/* Footer */}
                <div className='pt-5 mt-6 border-t border-slate-200'>
                  <div className='text-sm'>
                    Don’t you have an account?{' '}
                    <Link
                      className='font-medium text-indigo-500 hover:text-indigo-600'
                      to='/register'
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
        </div>
      </main>
    </>
  );
}
export default Login;
