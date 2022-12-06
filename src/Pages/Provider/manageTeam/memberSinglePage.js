import ModalBasic from '../../../components/ModalBasic';
import React, { useEffect, useState } from 'react';
import { useProfile } from '../../../hooks/profile';
import LoadingSvg from '../../../components/LoadingSvg';
import Image from '../../../images/user-avatar-80.png';
import { Formik, Field, Form } from 'formik';
import {
  useRegisterNewMember,
  useGetMemberById
} from '../../../hooks/useProvider';

import { usePhotoUpload } from '../../../hooks/useFiles';
import settings from '../../../config/settings';
import Dropzone from '../../../components/Dropzone';
import Toast2 from '../../../components/Toast2';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';

function MemberSinglePage({ props }) {
  const { saveUser, restoreUserAndToken, user } = useProfile();
  const [apiErrors, setApiErrors] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);

  const { mutateAsync: addMember, isLoading } = useRegisterNewMember();
  const params = useParams();
  console.log(params.id);
  const { data: user_data } = useGetMemberById(params.id);
  let users = [];

  const { mutateAsync: upload, isUploading } = usePhotoUpload();

  const handleSubmit = async (values) => {
    setApiErrors({});

    const photo =
      newPhoto && newPhoto.hasOwnProperty('path') ? newPhoto.path : user.photo;
    await addMember({ ...values, photo })
      .then((response) => {
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
          setToastData([{ type: 'error', msg: ' An error occurred!' }]);
          setToastOpen(true);
        });
    }
  };

  useEffect(() => {
    const hideToast = setTimeout(() => {
      setToastOpen(false);
    }, 8000);
  }, [toastOpen]);

  return (
    <div className='px-5 py-4'>
      <Formik
        initialValues={{
          first_name: user_data?.first_name,
          last_name: user_data?.last_name,
          email: user_data?.email,
          phone: user_data?.phone,
          password: '',
          password_confirmation: '',
          photo: user_data?.photo
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <section>
            <div className='flex user_datas-center justify-between'>
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
              <div className=''>
                <div className='flex flex-wrap  mb-6'>
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
                        apiErrors.hasOwnProperty('first_name') &&
                        typeof apiErrors.first_name[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-first-name'
                      type='text'
                    />
                    {apiErrors &&
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
                        apiErrors.hasOwnProperty('last_name') &&
                        typeof apiErrors.last_name[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-last-name'
                      type='text'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('last_name') &&
                      typeof apiErrors.last_name[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.last_name[0]}
                        </p>
                      )}
                  </div>
                  <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 job_title'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Job Title
                    </label>
                    <Field
                      name='job_title'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('job_title') &&
                        typeof apiErrors.job_title[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      type='text'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('job_title') &&
                      typeof apiErrors.job_title[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.job_title[0]}
                        </p>
                      )}
                  </div>
                </div>
                <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 email'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-last-name'
                  >
                    Email
                  </label>
                  <Field name='email' className='form-input w-full' />
                </div>
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
                      apiErrors.hasOwnProperty('phone') &&
                      typeof apiErrors.phone[0] !== 'undefined'
                        ? `border-red-500`
                        : `border-gray-300`
                    }`}
                    id='grid-last-phone'
                    type='phone'
                  />
                  {apiErrors &&
                    apiErrors.hasOwnProperty('phone') &&
                    typeof apiErrors.phone[0] !== 'undefined' && (
                      <p className='text-red-500 text-12'>
                        {apiErrors.phone[0]}
                      </p>
                    )}
                </div>
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
                      apiErrors.hasOwnProperty('password') &&
                      typeof apiErrors.password[0] !== 'undefined'
                        ? `border-red-500`
                        : `border-gray-300`
                    }`}
                    id='password'
                    type='password'
                    placeholder='***'
                  />
                  {apiErrors &&
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
                      apiErrors.hasOwnProperty('password_confirmation') &&
                      typeof apiErrors.password_confirmation[0] !== 'undefined'
                        ? `border-red-500`
                        : `border-gray-300`
                    }`}
                    id='repeat_password'
                    type='password'
                    placeholder='***'
                  />
                  {apiErrors &&
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
  );
}

export default MemberSinglePage;
