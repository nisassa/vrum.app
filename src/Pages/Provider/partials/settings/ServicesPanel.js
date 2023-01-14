import React, { useState, useEffect } from 'react';

import LoadingSvg from '../../../../components/LoadingSvg';
import settings from '../../../../config/settings';
import Toast2 from '../../../../components/Toast2';
import DisplayServices from '../../../../components/DisplayServices';

function ServicePanel() {
  return (
    <div className='grow'>
      {/* Panel body */}
      <div className='p-6 space-y-6'>{<DisplayServices />}</div>
    </div>
  );
}

export default ServicePanel;
