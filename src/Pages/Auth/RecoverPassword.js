import React, {useEffect, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import {
  useNavigate,
  useParams
} from "react-router-dom";
import {useForgotPassword, userPasswordReset} from "../../hooks/useAuth";

function RecoverPassword() {
  const navigate = useNavigate();
  const {token, email} = useParams()
  const [apiErrors, setApiErrors] = useState({})
  const [message, setMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const { mutateAsync: reset, isLoading } = userPasswordReset();
  const { mutateAsync: resend, isResending } = useForgotPassword();

  useEffect(() => {
    if (success !== false) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [success])

  const handleSubmit = async (values) => {
    setMessage(false)
    setApiErrors({})
    await reset(values)
        .then((response) => {
          if (response.hasOwnProperty('data')
              && typeof response.data === 'object'
              && response.data.hasOwnProperty('errors')
             && Object.keys(response.data.errors).length > 0
          ) {
            setMessage((response.data.errors[Object.keys(response.data.errors)[0]]))
          }

          if (response.data.hasOwnProperty('success') && response.data.success == true ) {
            setMessage("Password Reset Successfully! Please proceed to login!")
            setSuccess(true)
          }
        })
        .catch((error) => {
          if (error.hasOwnProperty('response') && typeof error.response === 'object' && error.response.hasOwnProperty('data')) {
            let responseData = error.response.data
            if (responseData.hasOwnProperty('errors') && typeof responseData.errors === 'object' && Object.keys(responseData.errors).length > 0) {
              setApiErrors(responseData.errors)
            }
          }
        });
  }

  return (
    <div className='container my-4 mx-auto px-4 md:px-12'>
      <div className='bg-yellow-400 p-4 mb-4'>
        <h1 className='w-full text-center text-white'>Recover Password Page</h1>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-gray-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
          <Formik
            initialValues={{
              email: email,
              password: '',
              password_confirmation: '',
              token: token
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className='flex flex-wrap justify-center' method='POST'>
              <div className='w-full md:w-1/3 security'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Recover Password
                </h3>

                { message !== false && (
                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 mt-4 mb-4 px-4 py-3" role="alert">
                      <p className="text-sm">{message}</p>
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
                    id='grid-password'
                    type='password'
                    placeholder='******************'
                  />
                  { apiErrors.hasOwnProperty('password') && typeof apiErrors.password[0] !== 'undefined' && (
                      <p className="text-red-500 text-12">
                        {apiErrors.password[0]}
                      </p>
                  )}
                </div>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='password-input'
                  >
                    Confirm Password
                  </label>
                  <Field
                    name='password_confirmation'
                    className={`w-full bg-white border text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700 ${
                        ( apiErrors.hasOwnProperty('password_confirmation') && typeof apiErrors.password_confirmation[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`)}`}
                    id='grid-password'
                    type='password'
                    placeholder='******************'
                  />
                  { apiErrors.hasOwnProperty('password_confirmation') && typeof apiErrors.password_confirmation[0] !== 'undefined' && (
                      <p className="text-red-500 text-12">
                        {apiErrors.password_confirmation[0]}
                      </p>
                  )}
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <button
                  disabled={isLoading}
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded'
                >
                  Reset Password
                </button>
              </div>
              <div className='w-full flex justify-center'>
                <button
                    disabled={isResending}
                    type='button'
                    onClick={() => resend({email})}
                    className='bg-yellow-400 hover:bg-yellow-700 text-white mt-4 font-bold py-2 px-20 rounded'
                >Resend Email</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default RecoverPassword;
