import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useClient';
import LoadingSvg from '../../components/LoadingSvg';
import Image from '../../images/user-avatar-80.png';

function AccountPanel() {
  const [sync, setSync] = useState(false);
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
    <div className='grow'>
      {/* Panel body */}
      <div className='p-6 space-y-6'>
        <h2 className='text-2xl text-slate-800 font-bold mb-5'>My Account</h2>
        {/* Picture */}

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
              provider_name: '',
              booking_by_specialist: false,
              job_title: '',
              phone: '',
              email: '',
              country: 'RO',
              city: '',
              state: '',
              postcode: '',
              line_1: '',
              password: '',
              password_confirmation: ''
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <section>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    <img
                      className='w-20 h-20 rounded-full'
                      src={Image}
                      width='80'
                      height='80'
                      alt='User upload'
                    />
                  </div>
                  <button className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white'>
                    Change
                  </button>
                </div>
              </section>
              <section>
                <div className='sm:flex  space-y-4 sm:space-y-0 sm:space-x-4 mt-5'>
                  <div className='sm:w-1/3'>
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
                  <div className='sm:w-1/3 contact-details px-3'>
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
                  <div className='sm:w-1/3'>
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
                </div>
              </section>
              {/* Email */}
              <section>
                <h2 className='text-xl leading-snug text-slate-800 font-bold mb-1'>
                  Email
                </h2>
                <div className='text-sm'>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia.
                </div>
                <div className='flex flex-wrap mt-5'>
                  <div className='mr-2'>
                    <label className='sr-only' htmlFor='email'>
                      Business email
                    </label>
                    <input id='email' className='form-input' type='email' />
                  </div>
                  <button className='btn border-slate-200 hover:border-slate-300 shadow-sm text-indigo-500'>
                    Change
                  </button>
                </div>
              </section>
              {/* Password */}
              <section>
                <h2 className='text-xl leading-snug text-slate-800 font-bold mb-1'>
                  Password
                </h2>
                <div className='text-sm'>
                  You can set a permanent password if you don't want to use
                  temporary login codes.
                </div>
                <div className='mt-5'>
                  <button className='btn border-slate-200 shadow-sm text-indigo-500'>
                    Set New Password
                  </button>
                </div>
              </section>

              <section>
                <div className='flex flex-col px-6 py-5 border-t border-slate-200'>
                  <div className='flex self-end'>
                    <button className='btn border-slate-200 hover:border-slate-300 text-slate-600'>
                      Cancel
                    </button>

                    <button
                      disabled={isLoading ? true : undefined}
                      type='submit'
                      className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3'
                    >
                      {isLoading ? <LoadingSvg /> : 'Save'}
                    </button>
                  </div>
                </div>
              </section>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}

export default AccountPanel;
