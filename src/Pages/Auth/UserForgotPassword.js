import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useForgotPassword } from '../../hooks/useAuth';

function UserForgotPassword() {
  const [apiErrors, setApiErrors] = useState({})
  const [message, setMessage] = useState(false)
  const { mutateAsync: sendPasswordReset, isLoading } = useForgotPassword();

  const handleSubmit = async (values) => {
    setMessage(false)
    setApiErrors({})
    await sendPasswordReset(values)
        .then((response) => {
          if (typeof response?.data[0] !== 'undefined') {
            setMessage(response?.data[0])
          }
        })
        .catch((error) => {
          if (error.hasOwnProperty('response') && typeof error.response === 'object' && error.response.hasOwnProperty('data')) {
            let responseData = error.response.data
            if (responseData.hasOwnProperty('errors') && typeof responseData.errors === 'object' && Object.keys(responseData.errors).length > 0) {
              setApiErrors(responseData.errors[0])
            }
          }
        });
  }

  return (
      <>
        <div className='container my-4 mx-auto px-4 md:px-12'>
          <div className='bg-yellow-400 p-4 mb-4'>
            <h1 className='w-full text-center text-white'>Forgot Password</h1>
          </div>
          <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
            <div className='w-full md:w-1/1 bg-gray-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
              <Formik
                  initialValues={{
                    email: '',
                  }}
                  onSubmit={(values) => handleSubmit(values)}
              >
                <Form className='flex flex-wrap justify-center' method='POST'>
                  <div className='w-full md:w-1/3 security mb-4'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Forgot Password
                    </h3>

                    { message !== false && (
                        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 mt-4 mb-4 px-4 py-3" role="alert">
                          <p className="text-sm">{message}</p>
                        </div>
                    )}

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
                  <div className='w-full flex justify-center'>
                    <button
                        type='submit'
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded'
                        disabled={isLoading ? true : undefined}
                    >
                      Send password reset link
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </>
  );
}

export default UserForgotPassword;
