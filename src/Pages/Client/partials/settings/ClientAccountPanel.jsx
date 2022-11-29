import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useUpdateClientProfile } from '../../../../hooks/useClient';
import { useProfile } from '../../../../hooks/profile';
import LoadingSvg from '../../../../components/LoadingSvg';
import Image from '../../../../images/user-avatar-80.png';
import Toast2 from '../../../../components/Toast2';

function ClientAccountPanel() {
  const { saveUser } = useProfile();
  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const { user } = useProfile();
  const { mutateAsync: updateClient, isLoading } = useUpdateClientProfile();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);

  const handleSubmit = async (values) => {
    setApiErrors({});
    await updateClient(values)
      .then((response) => {
        if (response?.data?.resource !== undefined) {
          saveUser(response.data.resource);
        }
        setToastData([
          { type: 'success', msg: ' Your profile was updated successfully' }
        ]);
        setToastOpen(true);
      })
      .catch((error) => {
        setToastData([{ type: 'error', msg: ' An error occurred!' }]);
        setToastOpen(true);
        if (
          error &&
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
        } else {
          console.log('An error occured!');
        }
      });
  };
  useEffect(() => {
    console.log(toastType);
    const hideToast = setTimeout(() => {
      setToastOpen(false);
    }, 8000);
  }, [toastOpen]);

  return (
    <div className='grow'>
      {toastOpen}
      <Toast2 type={toastType[0].type} open={toastOpen} setOpen={setToastOpen}>
        {toastType[0].msg}
      </Toast2>
      {/* Panel body */}
      <div className='p-6 space-y-6'>
        <h2 className='text-2xl text-slate-800 font-bold mb-5'>
          My Client Account
        </h2>
        {/* Picture */}

        <Formik
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            postcode: user.postcode,
            line_1: user.line_1,
            line_2: user.line_2,
            city: user.city,
            county: user.county,
            country: user.country,
            phone: user.phone,
            password: '',
            password_confirmation: '',
            job_title: user.job_title,
            landline: user.landline,
            photo: user.photo
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
                <Field type='file' name='photo' id='' />
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
                          apiErrors &&
                          apiErrors &&
                          apiErrors.hasOwnProperty('first_name') &&
                          typeof apiErrors.first_name[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-first-name'
                        type='text'
                        placeholder='Jane'
                      />
                      {apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('first_name') &&
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
                          apiErrors &&
                          apiErrors &&
                          apiErrors.hasOwnProperty('last_name') &&
                          typeof apiErrors.last_name[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-last-name'
                        type='text'
                        placeholder='Doe'
                      />
                      {apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('last_name') &&
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
                        disabled
                        name='email'
                        className='form-input w-full'
                      />
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
                        apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('phone') &&
                        typeof apiErrors.phone[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-last-name'
                      type='phone'
                      placeholder='+40770009770'
                    />
                    {apiErrors &&
                      apiErrors &&
                      apiErrors.hasOwnProperty('phone') &&
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
                    <Field
                      name='country'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors &&
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

                    {apiErrors &&
                      apiErrors &&
                      apiErrors.hasOwnProperty('country') &&
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
                          apiErrors &&
                          apiErrors &&
                          apiErrors.hasOwnProperty('city') &&
                          typeof apiErrors.city[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-city'
                        type='text'
                        placeholder='Brasov'
                      />
                      {apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('city') &&
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
                        apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('password') &&
                        typeof apiErrors.password[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-password'
                      type='password'
                      placeholder='***'
                      autocomplete='off'
                    />
                    {apiErrors &&
                      apiErrors &&
                      apiErrors.hasOwnProperty('password') &&
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
                        apiErrors &&
                        apiErrors &&
                        apiErrors.hasOwnProperty('password_confirmation') &&
                        typeof apiErrors.password_confirmation[0] !==
                          'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-password'
                      type='password'
                      placeholder='***'
                      autocomplete='off'
                    />
                    {apiErrors &&
                      apiErrors &&
                      apiErrors.hasOwnProperty('password_confirmation') &&
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

            <section>
              <div className='flex flex-col px-6 py-5 border-t border-slate-200'>
                <div className='flex self-end'>
                  <button
                    className='btn border-slate-200 hover:border-slate-300 text-slate-600'
                    type='button'
                  >
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
      </div>
    </div>
  );
}

export default ClientAccountPanel;
