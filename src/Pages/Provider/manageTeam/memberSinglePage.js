import React, { useEffect, useState } from 'react';
import LoadingSvg from '../../../components/LoadingSvg';
import { Formik, Field, Form } from 'formik';
import {
  useUpdateStaffUser,
  useGetMemberById,
  useToggleStaffSkill
} from '../../../hooks/useProvider';
import Toast2 from '../../../components/Toast2';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import BusinessHours from '../partials/settings/BusinessHours';
import DisplayServices from '../../../components/DisplayServices';

function MemberSinglePage({ props }) {
  const [apiErrors, setApiErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [businessDays, setBusinessDays] = useState([]);

  const { id } = useParams();

  const { data: user_data } = useGetMemberById(id);
  const { mutateAsync: updateUser, isLoading } = useUpdateStaffUser(id);
  const { mutateAsync: toggleSkill, isLoading: isUpdatingSkills } =
    useToggleStaffSkill(id);

  const toggleService = (service) => {
    toggleSkill(service)
      .then(() => {
        setToastData([{ type: 'success', msg: ' Skill updated!' }]);
        setToastOpen(true);
      })
      .catch(() => {
        setToastData([{ type: 'error', msg: ' An error occurred!' }]);
        setToastOpen(true);
      });
  };

  const handleSubmit = async (values) => {
    setApiErrors({});

    await updateUser({
      ...values,
      business_days: businessDays
    })
      .then((response) => {
        setToastData([
          { type: 'success', msg: 'User profile has been updated successfully' }
        ]);
        setToastOpen(true);
      })
      .catch((error) => {
        setToastData([{ type: 'error', msg: 'An error occurred!' }]);
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

  useEffect(() => {
    const hideToast = setTimeout(() => {
      setToastOpen(false);
    }, 8000);
  }, [toastOpen]);

  if (user_data === undefined) {
    return <Loading style='h-[calc(100vh_-_200px)]' />;
  }

  return (
    <div className='px-5 py-4'>
      {toastOpen}
      <Toast2 type={toastType[0].type} open={toastOpen} setOpen={setToastOpen}>
        {toastType[0].msg}
      </Toast2>
      <div className='md:flex'>
        <div className='w-1/2 px-3'>
          <Formik
            initialValues={{
              first_name: user_data?.first_name,
              last_name: user_data?.last_name,
              email: user_data?.email,
              phone: user_data?.phone,
              job_title: user_data?.job_title
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <section>
                <div className='sm:flex  space-y-4 sm:space-y-0 sm:space-x-4 mt-5'>
                  <div className=''>
                    <div className='flex flex-wrap  mb-6'>
                      <div className='w-full md:w-1/2 mb-6 md:pl-3 md:pr-3 md:mb-6'>
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
                      <div className='w-full flex flex-wrap mb-6 md:pl-3 job_title'>
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
                    <div className='w-full flex flex-wrap mb-6 md:pl-3 email'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Email
                      </label>
                      <Field name='email' className='form-input w-full' />
                    </div>
                    <div className='flex flex-wrap mb-6 md:pl-3 phone'>
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
                    <div className='busines-hours md:pl-3'>
                      <BusinessHours
                        workingDays={user_data.working_days}
                        setWorkingDays={setBusinessDays}
                      />
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
        <div className='w-1/2 px-3'>
          <DisplayServices
            selectedSkills={user_data?.service_types}
            onToggleService={toggleService}
            isSkill={true}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberSinglePage;
