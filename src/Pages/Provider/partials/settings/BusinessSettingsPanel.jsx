import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  useUpdateProviderProfile,
  useProviderImages,
  useDeletePhoto
} from '../../../../hooks/useProvider';
import { useProfile } from '../../../../hooks/profile';
import { usePhotoUpload } from '../../../../hooks/useFiles';
import LoadingSvg from '../../../../components/LoadingSvg';
import settings from '../../../../config/settings';
import Dropzone from '../../../../components/Dropzone';
import Toast2 from '../../../../components/Toast2';
import BusinessHours from './BusinessHours';

function BusinessSettingsPanel() {
  const [apiErrors, setApiErrors] = useState({});
  const { user, saveUser } = useProfile();

  const { mutateAsync: UpdateProvider, isLoading } = useUpdateProviderProfile();
  const { data: photoGallery, isLoading: isLoadingGallery } =
    useProviderImages();
  const { mutateAsync: deletePhoto, isLoading: isDeleting } = useDeletePhoto();
  const { mutateAsync: upload, isLoading: isUploading } = usePhotoUpload();

  const [bookBy, setBookBy] = useState([]);
  const [autoAlloc, setAutoAlloc] = useState([]);
  const [businessDays, setBusinessDays] = useState([]);
  const [showServicePrices, setShowServicePrices] = useState([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);

  const handleSubmit = async (values) => {
    setApiErrors({});
    await UpdateProvider({
      ...values,
      booking_by_specialist: bookBy,
      booking_auto_allocation: autoAlloc,
      show_service_prices_to_client: showServicePrices,
      business_days: businessDays
    })
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
          console.log('An error occurred!');
        }
      });
  };

  const onUploadImage = async (photo) => {
    if (photo) {
      let fd = new FormData();
      fd.append('entity', 'photo_gallery');
      fd.append('photo', photo);

      upload(fd)
        .then((response) => {
          if (Array.isArray(response?.data?.message?.photo)) {
            console.log(response?.data?.message?.photo[0]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const gallery =
    photoGallery !== undefined &&
    photoGallery.map((file) => {
      return (
        <div className={'ml-2 relative group block'} key={file.id}>
          <img
            src={`${settings.storageUrl}${file.photo}`}
            width='120'
            height='120'
            alt={file.name}
          />
          <button
            className={`btn absolute ${
              isUploading || isDeleting ? `opacity-1` : `opacity-0`
            } top-0 right-0 group-hover:opacity-100 group-hover:bg-slate-100 group-hover:bg-opacity-75 text-rose-500`}
            onClick={() => deletePhoto(file.id)}
            title={'remove'}
          >
            {isUploading || isDeleting ? (
              <LoadingSvg />
            ) : (
              <svg
                className='w-4 h-4 fill-current shrink-0'
                viewBox='0 0 16 16'
              >
                <path d='M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z' />
              </svg>
            )}
          </button>
        </div>
      );
    });

  useEffect(() => {
    setBookBy(user.provider.booking_by_specialist);
    setAutoAlloc(user.provider.booking_auto_allocation);
    setShowServicePrices(user.provider.show_service_prices_to_client);
  }, [
    user.provider.booking_by_specialist,
    user.provider.booking_auto_allocation,
    user.provider.show_service_prices_to_client
  ]);

  useEffect(() => {
    setTimeout(() => {
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
            booking_auto_allocation: autoAlloc,
            show_service_prices_to_client:
              user.provider.show_service_prices_to_client
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <section>
              <div className='flex container sm:w-full overflow-x-auto'>
                <div className='flex mr-4 sm:w-2/3 overflow-x-auto text-center border-2 justify-center items-center px-4 py-4'>
                  {isLoadingGallery && <LoadingSvg />}
                  {gallery.length !== 0 ? gallery : 'Upload your image here'}
                </div>
                <Dropzone
                  multiple={false}
                  maxSize={parseInt(settings.photoMaxSize, 500)}
                  onDrop={onUploadImage}
                  galleryImages={
                    photoGallery?.length > 0 ? photoGallery.length : undefined
                  }
                  maxNrOfFiles={parseInt(settings.maxGalleryImages)}
                />
              </div>
            </section>
            <section>
              <div className='sm:flex  space-y-4 sm:space-y-0 sm:space-x-4 mt-5'>
                <div className='md:w-full'>
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
                  <BusinessHours
                    workingDays={user.provider.working_days}
                    setWorkingDays={setBusinessDays}
                  />
                </div>
                <div className='md:w-full contact-details px-3'>
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
                      name='landline'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('landline') &&
                        typeof apiErrors.landline[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-landline'
                      type='landline'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('landline') &&
                      typeof apiErrors.landline[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.landline[0]}
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
                        apiErrors &&
                        apiErrors.hasOwnProperty('invoice_email') &&
                        typeof apiErrors.invoice_email[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-last-name'
                      type='email'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('invoice_email') &&
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
                    </div>
                    {apiErrors &&
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
                          apiErrors.hasOwnProperty('city') &&
                          typeof apiErrors.city[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-city'
                        type='text'
                      />
                      {apiErrors &&
                        apiErrors.hasOwnProperty('city') &&
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
                        apiErrors &&
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
                    {apiErrors &&
                      apiErrors.hasOwnProperty('state') &&
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
                        apiErrors &&
                        apiErrors.hasOwnProperty('line_1') &&
                        typeof apiErrors.line_1[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='input_line_1'
                      type='text'
                      placeholder='Robert Robertson, 1234 NW Bobcat Lane'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('line_1') &&
                      typeof apiErrors.line_1[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.line_1[0]}
                        </p>
                      )}
                  </div>
                </div>
                <div className='md:w-full'>
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
                  <div className='flex flex-wrap -mx-3 mb-6 px-3'>
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
                            checked={autoAlloc}
                            onChange={() => setAutoAlloc(!autoAlloc)}
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
                          {autoAlloc ? 'On' : 'Off'}
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6 px-3 '>
                    <section>
                      <h2 className='text-xl leading-snug text-slate-800 font-bold mb-1'>
                        Show service prices to clients
                      </h2>
                      <div className='text-sm'>
                        With this update, online-only files will no longer
                        appear to take up hard drive space.
                      </div>
                      <div className='flex items-center mt-5'>
                        <div className='form-switch'>
                          <Field
                            name='show_service_prices_to_client'
                            type='checkbox'
                            id='toggle_show_prices'
                            className='sr-only'
                            checked={showServicePrices}
                            onChange={() =>
                              setShowServicePrices(!showServicePrices)
                            }
                          />
                          <label
                            className='bg-slate-400'
                            htmlFor='toggle_show_prices'
                          >
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Show service prices</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {showServicePrices ? 'On' : 'Off'}
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
