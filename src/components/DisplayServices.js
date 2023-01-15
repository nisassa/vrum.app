import { 
  useGetServicesByCategories,
  useUpdateServicePivotFields 
} from '../hooks/useProvider';
import React, { useState, useEffect } from 'react';

function DisplayServices(props) {
  const { data } = useGetServicesByCategories();
  const { 
    selectedSkills, 
    onToggleService,
    isSkill
  } = props

  const [myServices, setMyServices] = useState();
  const [myInitialServices, setMmyInitialServices] = useState();
  
  const { mutateAsync: updateService } = useUpdateServicePivotFields();

  if (myServices === undefined && selectedSkills !== undefined || (
        selectedSkills !== undefined && selectedSkills.length !== myServices.length
    )) {  
    setMyServices(selectedSkills)
    setMmyInitialServices(selectedSkills)
  } 

  const toggleService = (service_id) => {
    if (isSkill) (
      onToggleService(service_id)
    ) 

    if (objectsAreSame(myInitialServices, myServices)) {
      onToggleService(service_id)
    } else {
      props.onUpdatePivotFields([
        { type: 'error', msg: ' Please `Save` or `Discard` your changes then try again!' }
      ])
    }
  }

  function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for(var propertyName in x) {
       if(x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
       }
    }
    return objectsAreSame;
  }

  const isDirty = (service) => {
    const initialService = myInitialServices.find(item => item.id === service.id)
    if (initialService === undefined) {
      return 
    }

    const isDirty = parseFloat(service.pivot_cost) !== parseFloat(initialService.pivot_cost) 
      || parseInt(service.pivot_duration_in_minutes) !== parseInt(initialService.pivot_duration_in_minutes)
    
    return isDirty
  }

  const pivotService = (service_id) => {
    let service = myServices.find(item => item.id === service_id)
    if (service === undefined) {
      return null
    }
    return service
  }

  const saveChanges = (service_id) => {
    const service = myServices.find(item => item.id === service_id)
    const postData = {
      cost: service.pivot_cost,
      vat: service.pivot_vat,
      duration_in_minutes: service.pivot_duration_in_minutes,
      service_id
    }

    updateService(postData).then(() => {
      props.onUpdatePivotFields([
        { type: 'success', msg: service.name + ' updated!' }
      ])
    }).catch((e) => {
      props.onUpdatePivotFields([
        { type: 'error', msg: ' '+ JSON.stringify(e?.response?.data?.errors) }
      ])
    })

    setMmyInitialServices(
      myInitialServices.map((item) => {
        if (item.id === service_id) {
          return service;
        } else {
          return item;
        }
      })
    )
  }

  const revertChanges = (service_id) => {
    setMyServices(
      myServices.map((item) => {
        if (item.id === service_id) {
          return myInitialServices.find(i => i.id === item.id);
        } else {
          return item;
        }
      })
    )
  }

  const changeFieldValue = (service_id, field, value) => {
    setMyServices(
      myServices.map((item) => {
        if (item.id === service_id) {
          return { ...item, [field]: value };
        } else {
          return item;
        }
      })
    )
  }
  
  const renderPivotFields = (service) => {
    if (service === null || isSkill) {
      return
    }

    return (
      <>  
        <span className='font-medium text-slate-800 peer-checked:text-black ml-2'>
          -
        </span>
        <span className='font-medium text-slate-800 peer-checked:text-black ml-2'>
          Price (EUR):
        </span>

        <input 
          class="appearance-none bg-transparent border-indigo-500 w-20 h-5 text-indigo-500 border-b-2 py-1 px-2 leading-tight focus:outline-none"
          type="text" 
          value={service?.pivot_cost}
          onChange={(e) => {
            changeFieldValue(service.id, 'pivot_cost', e.target.value)
          }}
        />

        <span className='font-medium text-slate-800 peer-checked:text-black ml-2'>
          Duration (in minutes):
        </span>

        <input 
          class="appearance-none bg-transparent border-indigo-500 w-20 h-5 text-indigo-500 border-b-2 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={service?.pivot_duration_in_minutes}
          onChange={(e) => {
            changeFieldValue(service.id, 'pivot_duration_in_minutes', e.target.value)
          }}
        />
        {isDirty(service) === true && <>
            <button onClick={() => saveChanges(service.id)} className="btn bg-indigo-500 hover:bg-indigo-600 text-xs h-5 text-white ml-3">Save</button>
            <button onClick={() => revertChanges(service.id)} className="btn bg-red-500 hover:bg-red-600 text-xs h-5 text-white ml-3">Revert</button>
          </>
        }
      </>
    )
  }

  return (
    <div>
      <>
        {data !== undefined && myServices !== undefined &&
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
                            <li key={sub_el.id} className='pl-5 flex row'>
                              <label className='flex items-center'>
                                <input
                                  type='checkbox'
                                  className='peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full'
                                  onChange={() => toggleService(sub_el.id) }
                                  checked={pivotService(sub_el.id) !== null}
                                />
                                <span className='font-medium text-slate-800 peer-checked:text-indigo-500 ml-2'>
                                  {sub_el.name}
                                </span>
                              </label>
                              { renderPivotFields(pivotService(sub_el.id)) }
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
