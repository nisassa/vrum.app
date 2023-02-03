import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';

function BusinessHours(props) {
  const { workingDays } = props;
  const [businessDays, setBusinessDays] = useState();

  useEffect(() => {
    setBusinessDays(workingDays);
    props.setWorkingDays(workingDays);
  }, [workingDays]);

  const changeTime = (newTime, id, type) => {
    const newBusinessDays = businessDays.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          [type]: newTime
        };
      } else {
        return item;
      }
    });
    setBusinessDays(newBusinessDays);

    props.setWorkingDays(newBusinessDays);
  };

  const changeIsActive = (evt, id) => {
    const newBusinessDays = businessDays.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          is_active: !item.is_active === true ? 1 : 0
        };
      } else {
        return item;
      }
    });

    setBusinessDays(newBusinessDays);

    props.setWorkingDays(newBusinessDays);
  };

  return (
    <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 email'>
      <label
        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
        htmlFor='grid-last-name'
      >
        Business hours
      </label>

      <div className='flex flex-wrap justify-center flex-col w-full'>
        {businessDays !== undefined &&
          businessDays.map((data) => {
            return (
              <div
                key={data.id}
                className='flex form-check justify-start mt-2 '
              >
                <input
                  className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
                  type='checkbox'
                  input={''}
                  checked={data.is_active === 1}
                  id={`${data.id}_business_days`}
                  onChange={(e) => changeIsActive(e, data.id)}
                ></input>
                <label
                  className='form-check-label inline-block text-gray-800 w-10 mr-2'
                  htmlFor={`${data}_business_days`}
                >
                  {data.day}:
                </label>
                <div className='flex flex-nowrap'>
                  <div className='flex justify-center'>
                    <div className='timepicker relative form-floating mb-3 xl:w-96'>
                      <input
                        type='text'
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        placeholder='Select a date'
                      />
                      <label htmlFor='floatingInput' className='text-gray-700'>
                        Select a time
                      </label>
                    </div>
                  </div>
                  {/* {data.is_active !== 0 && <span className='pr-2'>from</span>}
                  {data.is_active !== 0 ? (
                    <TimePicker
                      className={'flex'}
                      onChange={(t) => changeTime(t, data.id, 'start_at')}
                      value={data.start_at}
                      disableClock
                      autoFocus
                      clockClassName={'flex'}
                    />
                  ) : (
                    <div className={'flex form-input'}></div>
                  )}

                  {data.is_active !== 0 && <span className='px-2'>to</span>}
                  {data.is_active !== 0 ? (
                    <TimePicker
                      onChange={(t) => changeTime(t, data.id, 'end_at')}
                      value={data.end_at}
                      disableClock
                      autoFocus
                      clockClassName={'flex'}
                    />
                  ) : (
                    <div className={'flex'}></div>
                  )} */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BusinessHours;
