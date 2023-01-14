import React, { useState, useEffect } from 'react';
import Toast2 from '../../../../components/Toast2';
import Image from '../../../../images/user-avatar-80.png';
import Loading from '../../../../components/Loading';
import SearchForm from '../../partials/actions/SearchForm';
import UsersTabsCard from '../../partials/staff/UsersTabsCard';
import PaginationNumeric from '../../../../components/PaginationNumeric';
import AddNewMemberModal from '../../manageTeam/addNewMemeberModal';
import settings from '../../../../config/settings';
import { useGetAllMembers } from '../../../../hooks/useProvider';
import {
  BrowserRouter as Router,
  useParams
} from 'react-router-dom';

function MyTeamPanel() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { page } = useParams();

  const [pageNumb, setPageNumb] = useState(page ? page : '1');
  const {
    data: items,
    isLoading,
    refetch
  } = useGetAllMembers(searchTerm, pageNumb);

  useEffect(() => {
    setSearchTerm(inputValue);

    refetch();
  }, [inputValue, pageNumb, refetch]);

  useEffect(() => {
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
      <div className='space-y-6'>
        <main>
          <div className='px-2 sm:px-2 lg:px-8 py-2 w-full max-w-9xl mx-auto'>
            {/* Page header */}
            <div className='sm:flex sm:justify-end sm:items-center mb-8'>
              {/* Right: Actions */}
              <div className='grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2'>
                {/* Search form */}
                <SearchForm
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
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
            <div
              className={
                items === undefined
                  ? 'flex justify-center h-100'
                  : 'grid grid-cols-12 gap-6'
              }
            >
              {items === undefined ? <Loading /> : ''}

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
                      job_title={item.job_title}
                      manager={item.manager}
                    />
                  );
                })}
            </div>

            {/* Pagination */}
            <div className='mt-8'>
              <PaginationNumeric
                totalPages={items?.last_page}
                currentPage={items?.current_page}
                links={items?.links}
                pageNumb={pageNumb}
                setPageNumb={setPageNumb}
                isLoading={isLoading}
                refetch={refetch}
              />
            </div>

            <AddNewMemberModal
              feedbackModalOpen={feedbackModalOpen}
              setFeedbackModalOpen={setFeedbackModalOpen}
              toastOpen={toastOpen}
              setToastOpen={setToastOpen}
              toastType={toastType}
              setToastData={setToastData}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyTeamPanel;
