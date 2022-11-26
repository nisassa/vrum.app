import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useUpdateProviderProfile } from '../../../../hooks/useProvider';
import { useProfile } from '../../../../hooks/profile';
import { usePhotoUpload } from '../../../../hooks/useFiles';
import LoadingSvg from '../../../../components/LoadingSvg';
import Image from '../../../../images/user-avatar-80.png';
import settings from '../../../../config/settings';
import Dropzone from '../../../../components/Dropzone';

function BusinessSettingsPanel() {
  const [apiErrors, setApiErrors] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useProfile();
  const { mutateAsync: UpdateProvider, isLoading } = useUpdateProviderProfile();
  const { mutateAsync: upload, isUploading } = usePhotoUpload();
  const [bookBy, setBookBy] = useState(user.provider.booking_by_specialist);
  const [autoAloc, setAutoAloc] = useState(
    user.provider.booking_auto_allocation
  );

  const handleSubmit = async (values) => {
    setApiErrors({});
    await UpdateProvider({
      ...values,
      booking_by_specialist: bookBy,
      booking_auto_allocation: autoAloc
    })
      .then((i) => {
        setSuccessMessage('Your profile was updated successfully!');
      })
      .catch((error) => {
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
          console.log('An error occurred!');
        }
      });
  };

  const onUploadImage = async (photo) => {
    if (photo) {
      let fd = new FormData();
      fd.append('entity', 'user');
      fd.append('photo', photo);
      upload(fd)
        .then((response) => {
          if (response?.data?.document !== undefined) {
            setNewPhoto(response?.data?.document);
          }
          if (Array.isArray(response?.data?.message?.photo)) {
            console.log(response?.data?.message?.photo[0]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className='grow'>
      {/* Panel body */}
      <div className='p-6 space-y-6'>
        <h2 className='text-2xl text-slate-800 font-bold mb-5'>Profile</h2>
        {/* Picture */}
        <Formik
          initialValues={{
            name: user.provider.name,
            invoice_email: user.provider.invoice_email,
            postcode: user.provider.postcode,
            line_1: user.provider.line_1,
            line_2: user.provider.line_2,
            city: user.provider.city,
            county: user.provider.county,
            country: user.provider.country,
            landline: user.provider.landline,
            booking_by_specialist: bookBy,
            booking_auto_allocation: autoAloc
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <section>
              <div className='flex items-center'>
                <div className='mr-4 sm:w-1/3'>
                  <img
                    src={
                      newPhoto && newPhoto.hasOwnProperty('path')
                        ? `${settings.storageUrl}${newPhoto.path}`
                        : user.photo
                        ? `${settings.storageUrl}${user.photo}`
                        : Image
                    }
                    width='120'
                    height='120'
                    alt='User upload'
                  />
                </div>
                <Dropzone
                  multiple={false}
                  maxSize={parseInt(settings.photoMaxSize, 500)}
                  onDrop={onUploadImage}
                  onRemove={setNewPhoto}
                />
              </div>
            </section>
            <section>
              <div className='sm:flex  space-y-4 sm:space-y-0 sm:space-x-4 mt-5'>
                <div className='sm:w-1/3'>
                  <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                    Business Info
                  </h3>
                  <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 email'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Business name
                    </label>
                    <Field
                      type='text'
                      name='name'
                      className='form-input w-full'
                    />
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
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Invoice Email
                    </label>
                    <Field
                      name='invoice_email'
                      className={`form-input w-full ${
                        apiErrors.hasOwnProperty('invoice_email') &&
                        typeof apiErrors.invoice_email[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-last-name'
                      type='email'
                    />
                    {apiErrors.hasOwnProperty('invoice_email') &&
                      typeof apiErrors.invoice_email[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.invoice_email[0]}
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
                      />
                      {apiErrors.hasOwnProperty('city') &&
                        typeof apiErrors.city[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.city[0]}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6 px-3'>
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
                <div className='sm:w-1/3'>
                  <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                    Booking settings
                  </h3>

                  <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                    <section>
                      <h2 className='text-xl leading-snug text-slate-800 font-bold mb-1'>
                        Enable book by specialist
                      </h2>
                      <div className='text-sm'>
                        With this update, online-only files will no longer
                        appear to take up hard drive space.
                      </div>
                      <div className='flex items-center mt-5'>
                        <div className='form-switch'>
                          <Field
                            name='booking_by_specialist'
                            type='checkbox'
                            id='toggle'
                            className='sr-only'
                            checked={bookBy}
                            onChange={() => setBookBy(!bookBy)}
                          />
                          <label className='bg-slate-400' htmlFor='toggle'>
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Enable smart sync</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {bookBy ? 'On' : 'Off'}
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                    <section>
                      <h2 className='text-xl leading-snug text-slate-800 font-bold mb-1'>
                        Enable auto allocation
                      </h2>
                      <div className='text-sm'>
                        With this update, online-only files will no longer
                        appear to take up hard drive space.
                      </div>
                      <div className='flex items-center mt-5'>
                        <div className='form-switch'>
                          <Field
                            name='booking_auto_allocation'
                            type='checkbox'
                            id='toggle-auto-aloc'
                            className='sr-only'
                            checked={autoAloc}
                            onChange={() => setAutoAloc(!autoAloc)}
                          />
                          <label
                            className='bg-slate-400'
                            htmlFor='toggle-auto-aloc'
                          >
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Enable smart sync</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {autoAloc ? 'On' : 'Off'}
                        </div>
                      </div>
                    </section>
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

export default BusinessSettingsPanel;
