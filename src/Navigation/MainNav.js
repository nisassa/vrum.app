import React, { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/profile';
import { useLogout } from '../hooks/useAuth';
import Loading from '../components/Loading';

import UserAvatar from '../images/user-avatar-32.png';

export default function MainNav() {
  const { isAuthenticated, isServiceProvider, user } = useProfile();
  const { mutateAsync: logout, isLoading } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  if (isAuthenticated && isServiceProvider) return;
  return (
    <>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center w-full justify-between'>
              <div className='flex-shrink-0'>
                <img
                  className='h-8 w-8'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                />
              </div>
              <div className='hidden md:inline flex items-center justify-between'>
                <div className='flex flex-row items-center justify-between ml-10'>
                  <div className='flex'>
                    {!isAuthenticated && (
                      <>
                        <Link
                          className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                          to='/login'
                        >
                          Login
                        </Link>
                        <Link
                          className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                          to='/register'
                        >
                          Register
                        </Link>
                      </>
                    )}
                    {isAuthenticated && (
                      <>
                        <div className='relative inline-flex'>
                          <button
                            ref={trigger}
                            className='inline-flex justify-center items-center group'
                            aria-haspopup='true'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            aria-expanded={dropdownOpen}
                          >
                            <img
                              className='w-8 h-8 rounded-full'
                              src={UserAvatar}
                              width='32'
                              height='32'
                              alt='User'
                            />
                            <div className='flex items-center truncate'>
                              <span className='truncate ml-2 text-sm font-medium text-white'>
                                {`${user?.first_name} ${user?.last_name}`}
                              </span>
                              <svg
                                className='w-3 h-3 shrink-0 ml-1 fill-current text-slate-400'
                                viewBox='0 0 12 12'
                              >
                                <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                              </svg>
                            </div>
                          </button>

                          <Transition
                            className='origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1'
                            show={dropdownOpen}
                            enter='transition ease-out duration-200 transform'
                            enterStart='opacity-0 -translate-y-2'
                            enterEnd='opacity-100 translate-y-0'
                            leave='transition ease-out duration-200'
                            leaveStart='opacity-100'
                            leaveEnd='opacity-0'
                          >
                            <div
                              ref={dropdown}
                              onFocus={() => setDropdownOpen(true)}
                              onBlur={() => setDropdownOpen(false)}
                            >
                              <ul>
                                <li>
                                  <Link
                                    className='font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3'
                                    to='client/account'
                                    onClick={() =>
                                      setDropdownOpen(!dropdownOpen)
                                    }
                                  >
                                    My account
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className='font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3'
                                    to='/'
                                    onClick={handleLogout}
                                  >
                                    Sign Out
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Transition>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {!isOpen ? (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {(ref) => (
            <div className='md:hidden' id='mobile-menu'>
              <div
                ref={ref}
                className='px-2 pt-2 pb-3 space-y-1 flex flex-col  sm:px-3'
              >
                {!isAuthenticated && (
                  <>
                    <Link
                      className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                      to='/login'
                    >
                      Login
                    </Link>
                    <Link
                      className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                      to='/register'
                    >
                      Register
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Link
                      className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                      to={'/client/account'}
                    >
                      My account
                    </Link>
                    <a
                      className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
      {isLoading && <Loading />}
    </>
  );
}
