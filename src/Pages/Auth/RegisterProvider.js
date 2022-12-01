import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useProvider';
import LoadingSvg from '../../components/LoadingSvg';

function RegisterProvider() {
  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutateAsync: registerProvider, isLoading } = useRegister();

  const handleSubmit = async (values) => {
    await registerProvider(values)
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
        <div className='bg-yellow-400 p-4 mb-4'>
          <h1 className='w-full text-center text-white'>Register Provider</h1>
        </div>
        <div className='flex flex-col md:flex-row bg-white shadow-lg rounded-sm mb-8'>
          <div className='w-full md:w-1/1 mb-4 md:mb-0 px-4 py-4'>
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
                <Form className='flex flex-wrap'>
                  <div className='w-full md:w-1/3 personal-details px-3'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Your details
                    </h3>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full md:w-1/2 mb-6 md:pr-3 md:mb-0'>
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
                          id='input_first_name'
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
                          id='input_last_name'
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
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 company-name'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Company Name
                      </label>
                      <Field
                        name='provider_name'
                        className={`form-input w-full ${
                          apiErrors.hasOwnProperty('last_name') &&
                          typeof apiErrors.last_name[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='input_provider_name'
                        type='text'
                        placeholder='Vrom SRL'
                      />
                      {apiErrors.hasOwnProperty('last_name') &&
                        typeof apiErrors.last_name[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.last_name[0]}
                          </p>
                        )}
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 job-title'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Job Title
                      </label>
                      <Field
                        name='job_title'
                        className={`form-input w-full ${
                          apiErrors.hasOwnProperty('job_title') &&
                          typeof apiErrors.job_title[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='job_title'
                        type='text'
                        placeholder='Engineer'
                      />
                      {apiErrors.hasOwnProperty('job_title') &&
                        typeof apiErrors.job_title[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.job_title[0]}
                          </p>
                        )}
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 book-/by'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Book by specialist
                      </label>
                      <Field
                        name='booking_by_specialist'
                        className='block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='input_book_by'
                        type='checkbox'
                      />
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 contact-details px-3'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Contact details
                    </h3>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 phone'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
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
                        id='input_phone'
                        type='text'
                        placeholder='+40770009770'
                      />
                      {apiErrors.hasOwnProperty('phone') &&
                        typeof apiErrors.phone[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.phone[0]}
                          </p>
                        )}
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 phone'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
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
                        id='input_email'
                        type='text'
                        placeholder='company@domain.com'
                      />
                      {apiErrors.hasOwnProperty('email') &&
                        typeof apiErrors.email[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.email[0]}
                          </p>
                        )}
                    </div>

                    <div className='flex flex-wrap -mx-3 mb-6 px-3 country'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
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
                          id='country'
                          as='select'
                        >
                          <option>MD</option>
                          <option>RO</option>
                          <option>US</option>
                        </Field>
                        {apiErrors.hasOwnProperty('country') &&
                          typeof apiErrors.country[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.country[0]}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className='flex flex-wrap -mx-3 mb-6 location-details'>
                      <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-city'
                        >
                          City
                        </label>
                        <Field
                          name='city'
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('first_name') &&
                            typeof apiErrors.first_name[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          id='input_city'
                          type='text'
                          placeholder='Albuquerque'
                        />
                        {apiErrors.hasOwnProperty('city') &&
                          typeof apiErrors.city[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.city[0]}
                            </p>
                          )}
                      </div>
                      <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-state'
                        >
                          State
                        </label>
                        <div className='relative'>
                          <Field
                            name='state'
                            className={`form-input w-full ${
                              apiErrors.hasOwnProperty('state') &&
                              typeof apiErrors.state[0] !== 'undefined'
                                ? `border-red-500`
                                : `border-gray-300`
                            }`}
                            id='grid-state'
                            type='text'
                          />
                          {apiErrors.hasOwnProperty('state') &&
                            typeof apiErrors.state[0] !== 'undefined' && (
                              <p className='text-red-500 text-12'>
                                {apiErrors.state[0]}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-zip'
                        >
                          Zip
                        </label>
                        <Field
                          className={`form-input w-full ${
                            apiErrors.hasOwnProperty('state') &&
                            typeof apiErrors.state[0] !== 'undefined'
                              ? `border-red-500`
                              : `border-gray-300`
                          }`}
                          name='postcode'
                          id='input_postcode'
                          type='text'
                          placeholder='90210'
                        />
                        {apiErrors.hasOwnProperty('state') &&
                          typeof apiErrors.state[0] !== 'undefined' && (
                            <p className='text-red-500 text-12'>
                              {apiErrors.state[0]}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 address'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Your Address
                      </label>
                      <Field
                        name='line_1'
                        className={`form-input w-full ${
                          apiErrors.hasOwnProperty('line_1') &&
                          typeof apiErrors.line_1[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='input_line_1'
                        type='text'
                        placeholder='Robert Robertson, 1234 NW Bobcat Lane'
                      />
                      {apiErrors.hasOwnProperty('line_1') &&
                        typeof apiErrors.line_1[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.line_1[0]}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 security'>
                    <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                      Security
                    </h3>

                    <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
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
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                      <label
                        className='block uppercase tracking-wide text-back-700 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Retype Password
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
                        id='input_password_confirmation'
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
                      type='submit'
                      disabled={isLoading}
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
export default RegisterProvider;
