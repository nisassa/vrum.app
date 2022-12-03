import React, { useState, useEffect } from 'react';
import LoadingSvg from '../../../../components/LoadingSvg';
import Toast2 from '../../../../components/Toast2';
import Image from '../../../../images/user-avatar-80.png';

import SearchForm from '../../partials/actions/SearchForm';
import UsersTabsCard from '../../partials/staff/UsersTabsCard';
import PaginationNumeric from '../../../../components/PaginationNumeric';
import AddNewMemberModal from '../../manageTeam/addNewMemeberModal';

function MyTeamPanel() {
  const [apiErrors, setApiErrors] = useState({});

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const items = [
    {
      id: 0,
      name: 'Dominik McNeail',
      image: Image,
      link: '#0',
      location: '🇮🇹',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 1,
      name: 'Ivan Mesaros',
      image: Image,
      link: '#0',
      location: '🇫🇷',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 2,
      name: 'Tisha Yanchev',
      image: Image,
      link: '#0',
      location: '🇩🇪',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 3,
      name: 'Sergio Gonnelli',
      image: Image,
      link: '#0',
      location: '🇮🇹',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 4,
      name: 'Jerzy Wierzy',
      image: Image,
      link: '#0',
      location: '🇪🇸',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 5,
      name: 'Mirko Grubisic',
      image: Image,
      link: '#0',
      location: '🇩🇪',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 6,
      name: 'Alisha Acharya',
      image: Image,
      link: '#0',
      location: '🇬🇧',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 7,
      name: 'Brian Halligan',
      image: Image,
      link: '#0',
      location: '🇺🇸',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 8,
      name: 'Patricia Semklo',
      image: Image,
      link: '#0',
      location: '🇮🇳',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 9,
      name: 'Maria Martinez',
      image: Image,
      link: '#0',
      location: '🇮🇹',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 10,
      name: 'Vedad Siljak',
      image: Image,
      link: '#0',
      location: '🇨🇦',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    },
    {
      id: 11,
      name: 'Dominik Lamakani',
      image: Image,
      link: '#0',
      location: '🇧🇪',
      content:
        'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.'
    }
  ];

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
              {items.map((item) => {
                return (
                  <UsersTabsCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
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
