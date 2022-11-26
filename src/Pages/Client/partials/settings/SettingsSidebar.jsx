import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SettingsSidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3'>
      {/* Group 1 */}
      <div>
        <div className='text-xs font-semibold text-slate-400 uppercase mb-3'>
          Business settings
        </div>
        <ul className='flex flex-nowrap md:block mr-3 md:mr-0'>
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <NavLink
              end
              to='/settings/account'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/account') && 'bg-indigo-50'
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
                  pathname.includes('/settings/account') && 'text-indigo-400'
                }`}
                viewBox='0 0 16 16'
              >
                <path d='M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z' />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/account')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                My Account
              </span>
            </NavLink>
          </li>
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <NavLink
              end
              to='/settings/notifications'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/notifications') && 'bg-indigo-50'
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
                  pathname.includes('/settings/notifications') &&
                  'text-indigo-400'
                }`}
                viewBox='0 0 16 16'
              >
                <path d='M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z' />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/notifications')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                My Notifications
              </span>
            </NavLink>
          </li>

          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <NavLink
              end
              to='/settings/billing'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/billing') && 'bg-indigo-50'
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
                  pathname.includes('/settings/billing') && 'text-indigo-400'
                }`}
                viewBox='0 0 16 16'
              >
                <path d='M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z' />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/billing')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Billing & Invoices
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Group 2 */}
    </div>
  );
}

export default SettingsSidebar;
