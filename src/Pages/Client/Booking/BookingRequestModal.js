import ModalBasic from '../../../components/ModalBasic';
import React, { useEffect, useState } from 'react';

function BookingRequestModal({
  bookingRequest,
  setBookingRequest,
  toastOpen,
  setToastOpen,
  toastType,
  setToastData
}) {
  return (
    <ModalBasic
      id='BookingModal'
      className='w-full h-full max-w-2xl md:h-auto'
      modalOpen={bookingRequest}
      setModalOpen={setBookingRequest}
      title='Register new team member'
    >
      <div className='px-5 py-4'>Modal</div>
    </ModalBasic>
  );
}

export default BookingRequestModal;
