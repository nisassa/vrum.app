import React, { useState } from 'react';

import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import DeleteButton from './partials/actions/DeleteButton';
import SearchForm from './partials/actions/SearchForm';
import DropdownTransaction from '../../components/DropdownTransaction';
import TransactionsTable from './partials/finance/TransactionsTable';
import PaginationClassic from '../../components/PaginationClassic';

function Bookings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {/* Content */}
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Page header */}

            {/* Filters */}
            <div className='mb-5'>
              <ul className='flex flex-wrap -m-1'>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out'>
                    View All
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out'>
                    Completed
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out'>
                    Pending
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out'>
                    Canceled
                  </button>
                </li>
              </ul>
            </div>

            {/* Table */}
            <TransactionsTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className='mt-8'>
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Bookings;
