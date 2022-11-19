import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';

import { useRegister } from '../../hooks/useProvider';

function RegisterProvider() {
  const { mutateAsync: registerProvider, isLoading } = useRegister();

  return (
    <div className='container my-4 mx-auto px-4 md:px-4'>
      <div className='flex w-full justify-center items-center bg-yellow-400 p-4 mb-4'>
        <h1 className='flex-1 text-white'>Register Provider</h1>
        <div className='flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-red-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              provider_name: '',
              booking_by_specialist: '',
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
              console.log('submit provider');

              registerProvider(values);
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
                      className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                      id='input_first_name'
                      type='text'
                      placeholder='Jane'
                      autocomplete="off"
                    />
                    {/* <p className='hidetext-red-500 text-xs italic'>
                      Please fill out this field.
                    </p> */}
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
                      className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                      id='input_last_name'
                      type='text'
                      placeholder='Doe'
                      autocomplete="off"
                    />
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
                    autocomplete="off"
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_provider_name'
                    type='text'
                    placeholder='Vrom SRL'
                  />
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='job_title'
                    type='text'
                    placeholder='Engineer'
                    autocomplete="off"
                  />
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
                    autocomplete="off"
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_phone'
                    type='text'
                    placeholder='+40770009770'
                    autocomplete="off"
                  />
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_email'
                    type='text'
                    placeholder='company@domain.com'
                    autocomplete="off"
                  />
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
                      className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-500'
                      id='country'
                      as='select'
                      autocomplete="off"
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
                      className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                      id='input_city'
                      type='text'
                      placeholder='Albuquerque'
                      autocomplete="off"
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
                      <Field
                        name='state'
                        className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                        id='grid-state'
                        type='text'
                        autocomplete="off"
                      />
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
                      className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                      name='postcode'
                      id='input_postcode'
                      type='text'
                      placeholder='90210'
                      autocomplete="off"
                    />
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_line_1'
                    type='text'
                    placeholder='Robert Robertson, 1234 NW Bobcat Lane'
                    autocomplete="off"
                  />
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_password'
                    type='password'
                    placeholder='******************'
                    autocomplete="off"
                  />
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
                    className='w-full bg-white border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded focus:border-gray-700'
                    id='input_password_confirmation'
                    type='password'
                    placeholder='******************'
                    autocomplete="off"
                  />
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded'
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default RegisterProvider;
