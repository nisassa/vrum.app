import React from 'react';
import ListingCard from '../components/ListingsCard';
function IndexPage() {
  return (
    <>
      <div className='md:container md:mx-auto  my-4 px-4'>
        <div className='bg-yellow-400 p-4 mb-4'>
          <h1 className='w-full text-center text-white'>Guest Home</h1>
        </div>
        <div className='data-wrapper w-full'>
          <div className='filters flex'>
            <form className='flex '>
              <div className='search flex-auto mx-2'>
                <div className='relative'>
                  <input
                    id='form-search'
                    className='form-input w-full pl-9'
                    type='search'
                  />
                  <button
                    className='absolute inset-0 right-auto group'
                    type='submit'
                    aria-label='Search'
                  >
                    <svg
                      className='w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2'
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
                      <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='country flex-auto mx-2'>
                <select id='country' className='form-select'>
                  <option>All cities</option>
                  <option>Brasov</option>
                  <option>Cluj</option>
                  <option>Bucuresti</option>
                </select>
              </div>
              <div className='services flex-auto mx-2'>
                <select id='services' className='form-select'>
                  <option>All services</option>
                  <option>Electric</option>
                  <option>Engine</option>
                  <option>Full diagnostic</option>
                </select>
              </div>
            </form>
          </div>
          <div className='listings flex flex-wrap'>
            <div className='md:w-1/2 p-4 cards'>
              <div className='grid grid-cols-12 gap-6'>
                <ListingCard />
                <ListingCard />
                <ListingCard />
              </div>
            </div>
            <div className='md:w-1/2 p-4 map'>maps</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IndexPage;
