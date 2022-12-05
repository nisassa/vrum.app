import React, { useState, useEffect } from 'react';
import LoadingSvg from '../../../../components/LoadingSvg';
import Toast2 from '../../../../components/Toast2';
import Image from '../../../../images/user-avatar-80.png';

import SearchForm from '../../partials/actions/SearchForm';
import UsersTabsCard from '../../partials/staff/UsersTabsCard';
import PaginationNumeric from '../../../../components/PaginationNumeric';
import AddNewMemberModal from '../../manageTeam/addNewMemeberModal';
import settings from '../../../../config/settings';
import { useGetAllMembers } from '../../../../hooks/useProvider';

function MyTeamPanel() {
  const [apiErrors, setApiErrors] = useState({});

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const { data: items, isLoading } = useGetAllMembers();

  useEffect(() => {
    const myItem = items?.data.find((item: any) => {
      return item.id === Number(7);
    });

    const hideToast = setTimeout(() => {
      setToastOpen(false);
      console.log(myItem);
    }, 8000);
  }, [toastOpen]);
  return (
    <div className='grow'>
      {toastOpen}
      <Toast2 type={toastType[0].type} open={toastOpen} setOpen={setToastOpen}>
        {toastType[0].msg}
      </Toast2>
      {/* Panel body */}
      <div className='space-y-6'>
        <main>
          <div className='px-2 sm:px-2 lg:px-8 py-2 w-full max-w-9xl mx-auto'>
            {/* Page header */}
            <div className='sm:flex sm:justify-end sm:items-center mb-8'>
              {/* Right: Actions */}
              <div className='grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2'>
                {/* Search form */}
                <SearchForm />
                {/* Add member button */}
                <button
                  id='add-new-member-modal'
                  className='btn bg-indigo-500 hover:bg-indigo-600 text-white'
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeedbackModalOpen(true);
                  }}
                >
                  <svg
                    className='w-4 h-4 fill-current opacity-50 shrink-0'
                    viewBox='0 0 16 16'
                  >
                    <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
                  </svg>
                  <span className='hidden xs:block ml-2'>Add Member</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-12 gap-6'>
              {items !== undefined &&
                items.data.map((item) => {
                  const imgPath =
                    item.photo !== null
                      ? `${settings.storageUrl}${item.photo}`
                      : Image;
                  return (
                    <UsersTabsCard
                      key={item.id}
                      id={item.id}
                      name={`${item.first_name} ${item.last_name}`}
                      image={imgPath}
                      link={item.link}
                      location={item.location}
                      content={item.content}
                    />
                  );
                })}
            </div>

            {/* Pagination */}
            <div className='mt-8'>
              <PaginationNumeric />
            </div>

            <AddNewMemberModal
              feedbackModalOpen={feedbackModalOpen}
              setFeedbackModalOpen={setFeedbackModalOpen}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyTeamPanel;
