import React, { useEffect, useState } from 'react';
import { useGetAllServices } from '../hooks/useProvider';

function DisplayServices() {
  const { data } = useGetAllServices();
  console.log(data);

  return (
    <h1>
      {data !== undefined &&
        data.map((service) => {
          return <h1 key={service.id}>{service.name}</h1>;
        })}
    </h1>
  );
}

export default DisplayServices;
