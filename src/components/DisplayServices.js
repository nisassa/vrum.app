import React, { useEffect, useState } from 'react';
import { useGetServicesByCategories } from '../hooks/useProvider';

function DisplayServices() {
  const { data } = useGetServicesByCategories();
  console.log(data);

  return (
    <div>
      <>
        {data !== undefined &&
          Object.keys(data).map((el) => {
            return (
              <div className='space-y-2'>
                {/* Task */}
                <h2 className='pt-6 pl-2'> {data[el].name}</h2>
                <div className='bg-white shadow-lg rounded-sm border border-slate-200 p-4'>
                  <div className='sm:flex sm:justify-between sm:items-start'>
                    {/* Left side */}
                    <div className='grow mt-0.5 mb-3 sm:mb-0 space-y-3'>
                      <div className='flex items-start'>
                        {/* Drag button */}
                        <button className='cursor-move mr-2'>
                          <span className='sr-only'>Drag</span>
                          <svg
                            className='w-3 h-3 fill-slate-500'
                            viexbox='0 0 12 12'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z'
                              fill='#CBD5E1'
                              fillRule='evenodd'
                            />
                          </svg>
                        </button>

                        {/* Checkbox button */}
                        <ul className=' space-y-3'>
                          {data[el].services.map((sub_el) => (
                            <li key={sub_el.id} className='pl-5'>
                              <label className='flex items-center'>
                                <input
                                  type='checkbox'
                                  className='peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full'
                                />
                                <span className='font-medium text-slate-800 peer-checked:text-indigo-500 ml-2'>
                                  {sub_el.name}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Nested checkboxes */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
}

export default DisplayServices;
