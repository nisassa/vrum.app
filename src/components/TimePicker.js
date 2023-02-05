import React, { useState } from 'react';

function TimePicker() {
  const [time, setTime] = useState({});
  const businessDays = {
    Monday: { startTime: '', endTime: '' },
    Tuesday: { startTime: '', endTime: '' },
    Wednesday: { startTime: '', endTime: '' },
    Thursday: { startTime: '', endTime: '' },
    Friday: { startTime: '', endTime: '' }
  };

  const handleChange = (day, type, hour, minute, ampm) => {
    setTime({
      ...time,
      [day]: {
        ...time[day],
        [type]: `${hour}:${minute} ${ampm}`
      }
    });
  };

  return (
    <div className='relative w-48 mt-6 flex flex-col'>
      <div className='absolute inset-0 bg-white p-4'>
        {Object.keys(businessDays).map((day, index) => (
          <div key={index} className='flex flex-col mt-6'>
            <label className='text-sm font-medium'>{day}</label>
            <div className='flex mt-2'>
              <CustomTimePicker
                value={time[day]?.startTime || ''}
                onChange={(hour, minute, ampm) =>
                  handleChange(day, 'startTime', hour, minute, ampm)
                }
                placeholder='Start Time'
              />
              <CustomTimePicker
                value={time[day]?.endTime || ''}
                onChange={(hour, minute, ampm) =>
                  handleChange(day, 'endTime', hour, minute, ampm)
                }
                placeholder='End Time'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomTimePicker({ value, onChange, placeholder }) {
  return (
    <div className='w-1/2 p-2 rounded-md'>
      <input type='text' value={value} placeholder={placeholder} />
      <div>
        <select>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          ...
        </select>
        <span className='mx-2'>:</span>
        <select>
          <option value='00'>00</option>
          <option value='15'>15</option>
          <option value='30'>30</option>
          <option value='45'>45</option>
        </select>
        <select>
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </select>
        <button onClick={() => onChange('hour', 'minute', 'ampm')}>
          Update
        </button>
      </div>
    </div>
  );
}

export default TimePicker;
