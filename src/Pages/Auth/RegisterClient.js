import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useClient';
import LoadingSvg from '../../components/LoadingSvg';

function RegisterClient() {
  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutateAsync: registerClient, isLoading } = useRegister();

  const handleSubmit = async (values) => {
    await registerClient(values)
      .then((i) => {
        setSuccessMessage('Thanks for Registering! You can go to login now!');
      })
      .catch((error) => {
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

  useEffect(() => {
    if (successMessage !== false) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [successMessage, navigate]);

  return (
    <>
      <div className='container my-4 mx-auto px-4 md:px-4'>
        <div className=' p-4 mb-4'>
          <h1 className='text-3xl text-slate-800 font-bold mb-6 text-center'>
            Register Client
          </h1>
        </div>
        <div className='bg-white shadow-lg rounded-sm mb-8 flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
          <div className='w-full md:w-1/1  rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
            {successMessage !== false && (
              <div
                className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
                role='alert'
              >
                <p className='font-bold'>Success!</p>
                <p className='text-sm'>{successMessage}</p>
              </div>
            )}
            {successMessage === false && (
              <Formik
                initialValues={{
                  first_name: '',
                  last_name: '',
                  phone: '',
                  email: '',
                  country: 'RO',
                  city: '',
                  password: '',
                  password_confirmation: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form className='flex flex-wrap' method='POST'>
                  <div className='w-full md:w-1/3 personal-details px-3'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Your details
                    </h3>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full md:w-1/2 mb-6 md:pr-3 md:mb-6'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-first-name'
                        >
                          First Name
                        </label>
                        <Field
                          name='first_name'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('first_name') &&
                            typeof apiErrors.first_name[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='grid-first-name'
                          type='text'
                          placeholder='Jane'
                        />
                        {apiErrors.hasOwnProperty('first_name') &&
                          typeof apiErrors.first_name[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.first_name[0]}
                            </p>
                          )}
                      </div>
                      <div className='w-full md:w-1/2 md:pl-3'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-last-name'
                        >
                          Last Name
                        </label>
                        <Field
                          name='last_name'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('last_name') &&
                            typeof apiErrors.last_name[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='grid-last-name'
                          type='text'
                          placeholder='Doe'
                        />
                        {apiErrors.hasOwnProperty('last_name') &&
                          typeof apiErrors.last_name[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.last_name[0]}
                            </p>
                          )}
                      </div>
                      <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 email'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-last-name'
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
                          id='grid-last-name'
                          type='email'
                          placeholder='example@gmail.com'
                        />
                        {apiErrors.hasOwnProperty('email') &&
                          typeof apiErrors.email[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.email[0]}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 contact-details px-3'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Contact details
                    </h3>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 phone'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Phone Number
                      </label>
                      <Field
                        name='phone'
                        className={`form-input w-full ${
                          apiErrors.hasOwnProperty('phone') &&
                          typeof apiErrors.phone[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-last-name'
                        type='phone'
                        placeholder='+40770009770'
                      />
                      {apiErrors.hasOwnProperty('phone') &&
                        typeof apiErrors.phone[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.phone[0]}
                          </p>
                        )}
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 country'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-state'
                      >
                        Country
                      </label>
                      <div className='w-full'>
                        <Field
                          name='country'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('country') &&
                            typeof apiErrors.country[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='grid-state'
                          as='select'
                        >
                          <option>MD</option>
                          <option>RO</option>
                          <option>US</option>
                        </Field>
                      </div>
                      {apiErrors.hasOwnProperty('country') &&
                        typeof apiErrors.country[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.country[0]}
                          </p>
                        )}
                    </div>

                    <div className='flex flex-wrap -mx-3 mb-6 location-details'>
                      <div className='w-full px-3 mb-6 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-city'
                        >
                          City
                        </label>
                        <Field
                          name='city'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('city') &&
                            typeof apiErrors.city[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='grid-city'
                          type='text'
                          placeholder='Brasov'
                        />
                        {apiErrors.hasOwnProperty('city') &&
                          typeof apiErrors.city[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.city[0]}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 security'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Security
                    </h3>

                    <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-password'
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
                        id='grid-password'
                        type='password'
                        placeholder='***'
                      />
                      {apiErrors.hasOwnProperty('password') &&
                        typeof apiErrors.password[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.password[0]}
                          </p>
                        )}
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Confirm Password
                      </label>
                      <Field
                        name='password_confirmation'
                        className={`form-input w-full ${
                          apiErrors.hasOwnProperty('password_confirmation') &&
                          typeof apiErrors.password_confirmation[0] !==
                            'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-password'
                        type='password'
                        placeholder='***'
                      />
                      {apiErrors.hasOwnProperty('password_confirmation') &&
                        typeof apiErrors.password_confirmation[0] !==
                          'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.password_confirmation[0]}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className='w-full flex justify-center'>
                    <button
                      disabled={isLoading ? true : undefined}
                      type='submit'
                      className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 px-20'
                    >
                      {isLoading ? <LoadingSvg /> : 'Register'}
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterClient;
