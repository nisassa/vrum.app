import React, { useState } from 'react';
import SettingsSidebar from '../../partials/settings/SettingsSidebar';
import AccountPanel from '../../partials/settings/AccountPanel';
function ClientAccount() {
  const [sync, setSync] = useState(false);
  return (
    <>
      <main className='container mx-auto my-4 mt-1o px-4 md:px-12'>
        <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          {/* Page header */}
          <div className='mb-8'>
            {/* Title */}
            <h1 className='text-2xl md:text-3xl text-slate-800 font-bold'>
              Account Settings ✨
            </h1>
          </div>

          {/* Content */}
          <div className='bg-white shadow-lg rounded-sm mb-8'>
            <div className='flex flex-col md:flex-row md:-mr-px'>
              <SettingsSidebar />
              <AccountPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default ClientAccount;
