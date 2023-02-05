import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';

function BusinessHours(props) {
  const { workingDays } = props;
  const [businessDays, setBusinessDays] = useState();
  const [time, setTime] = useState({});

  const handleChange = (event, day, type, id) => {
    setTime({
      ...time,
      [day]: {
        ...time[day],
        [type]: event.target.value
      }
    });
    console.log(day);
    const newBusinessDays = businessDays.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          [type]: event.target.value
        };
      } else {
        return item;
      }
    });
    console.log(newBusinessDays);
    setBusinessDays(newBusinessDays);

    props.setWorkingDays(newBusinessDays);
  };
  useEffect(() => {
    setBusinessDays(workingDays);
    props.setWorkingDays(workingDays);
  }, [workingDays]);

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
                  className={` form-checkbox appearance-none h-4 w-4 border border-gray-300 focus:outline-none transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer`}
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
                <div className='flex w-60 justify-start'>
                  {data.is_active !== 0 ? (
                    <input
                      type='time'
                      value={data.start_at || ''}
                      onChange={(e) =>
                        handleChange(e, data.day, 'start_at', data.id)
                      }
                      className='form-input w-1/2 mx-2 rounded-md'
                    />
                  ) : (
                    <div className={'form-input'}></div>
                  )}

                  {data.is_active !== 0 ? (
                    <input
                      type='time'
                      value={data.end_at || ''}
                      onChange={(e) =>
                        handleChange(e, data.id, 'end_at', data.id)
                      }
                      className='form-input w-1/2 mx-2 rounded-md'
                    />
                  ) : (
                    <div className={'flex'}></div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BusinessHours;
