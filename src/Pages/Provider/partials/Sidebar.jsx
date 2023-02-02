import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40  lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden='true'
      ></div>

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}

          {/* Logo */}
          <NavLink end to='/' className='block'>
            <svg width='32' height='32' viewBox='0 0 32 32'>
              <defs>
                <linearGradient
                  x1='28.538%'
                  y1='20.229%'
                  x2='100%'
                  y2='108.156%'
                  id='logo-a'
                >
                  <stop stopColor='#A5B4FC' stopOpacity='0' offset='0%' />
                  <stop stopColor='#A5B4FC' offset='100%' />
                </linearGradient>
                <linearGradient
                  x1='88.638%'
                  y1='29.267%'
                  x2='22.42%'
                  y2='100%'
                  id='logo-b'
                >
                  <stop stopColor='#38BDF8' stopOpacity='0' offset='0%' />
                  <stop stopColor='#38BDF8' offset='100%' />
                </linearGradient>
              </defs>
              <rect fill='#6366F1' width='32' height='32' rx='16' />
              <path
                d='M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z'
                fill='#4F46E5'
              />
              <path
                d='M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z'
                fill='url(#logo-a)'
              />
              <path
                d='M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z'
                fill='url(#logo-b)'
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span
                className='hidden lg:block  2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
              <span className=' lg:block 2xl:block'>Pages</span>
            </h3>
            <ul className='mt-3'>
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('provider') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/provider'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('provider') && 'hover:text-slate-200'
                  }`}
                >
                  <div className='flex items-center'>
                    <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                      <path
                        className={`fill-current text-slate-400 ${
                          (pathname === '/' || pathname.includes('provider')) &&
                          '!text-indigo-500'
                        }`}
                        d='M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z'
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          (pathname === '/' || pathname.includes('provider')) &&
                          'text-indigo-600'
                        }`}
                        d='M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z'
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          (pathname === '/' || pathname.includes('provider')) &&
                          'text-indigo-200'
                        }`}
                        d='M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z'
                      />
                    </svg>
                    <span className='text-sm font-medium ml-3  lg:opacity-100 2xl:opacity-100 duration-200'>
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Bookings */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('bookings') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/bookings'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('bookings') && 'hover:text-slate-200'
                  }`}
                >
                  <div className='flex items-center'>
                    <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes('bookings') && 'text-indigo-500'
                        }`}
                        d='M8 1v2H3v19h18V3h-5V1h7v23H1V1z'
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes('bookings') && 'text-indigo-500'
                        }`}
                        d='M1 1h22v23H1z'
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes('bookings') && 'text-indigo-300'
                        }`}
                        d='M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z'
                      />
                    </svg>
                    <span className='text-sm font-medium ml-3  lg:opacity-100 2xl:opacity-100 duration-200'>
                      Bookings
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Business Settings */}
              <SidebarLinkGroup activecondition={pathname.includes('business')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('business') &&
                          'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className='shrink-0 h-6 w-6'
                              viewBox='0 0 24 24'
                            >
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes('business') &&
                                  'text-indigo-500'
                                }`}
                                d='M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z'
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes('business') &&
                                  'text-indigo-300'
                                }`}
                                d='M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z'
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes('business') &&
                                  'text-indigo-500'
                                }`}
                                d='M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z'
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes('business') &&
                                  'text-indigo-300'
                                }`}
                                d='M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z'
                              />
                            </svg>
                            <span className='text-sm font-medium ml-3  lg:opacity-100 2xl:opacity-100 duration-200'>
                              My Business
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className=' lg:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/settings/business'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                Business settings
                              </span>
                            </NavLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/business/services'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                Services
                              </span>
                            </NavLink>
                          </li>

                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/business/my-team'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                My team
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Calendar */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('calendar') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/calendar'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('calendar') && 'hover:text-slate-200'
                  }`}
                >
                  <div className='flex items-center'>
                    <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes('calendar') && 'text-indigo-500'
                        }`}
                        d='M1 3h22v20H1z'
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes('calendar') && 'text-indigo-300'
                        }`}
                        d='M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z'
                      />
                    </svg>
                    <span className='text-sm font-medium ml-3  lg:opacity-100 2xl:opacity-100 duration-200'>
                      Calendar
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('user') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className='shrink-0 h-6 w-6'
                              viewBox='0 0 24 24'
                            >
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes('user') && 'text-indigo-500'
                                }`}
                                d='M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z'
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes('user') && 'text-indigo-300'
                                }`}
                                d='M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z'
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes('user') && 'text-indigo-500'
                                }`}
                                d='M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z'
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes('user') && 'text-indigo-300'
                                }`}
                                d='M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z'
                              />
                            </svg>
                            <span className='text-sm font-medium ml-3  lg:opacity-100 2xl:opacity-100 duration-200'>
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className=' lg:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/settings/account'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                My Account
                              </span>
                            </NavLink>
                          </li>

                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/settings/notifications'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                My Notifications
                              </span>
                            </NavLink>
                          </li>

                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/settings/billing'
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' +
                                (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className='text-sm font-medium  lg:opacity-100 2xl:opacity-100 duration-200'>
                                Billing & Invoices
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
