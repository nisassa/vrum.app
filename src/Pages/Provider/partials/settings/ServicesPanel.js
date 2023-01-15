import DisplayServices from '../../../../components/DisplayServices';
import { useProfile } from '../../../../hooks/profile';
import { useState } from 'react';
import { 
  useMyServices,
  useToggleMyService 
} from '../../../../hooks/useProvider';
import Toast2 from '../../../../components/Toast2';

function ServicePanel() {
  const { user } = useProfile();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);

  const { data: myServices } = useMyServices();

  const { mutateAsync: toggleSkill, isLoading: isUpdatingSkills } = useToggleMyService(user?.provider?.id);

  const onUpdatePivotFields = (toastData) => {
    setToastData(toastData)
    setToastOpen(true)
  } 

  const toggleService = (service) => {
    toggleSkill(service)
      .then(() => {
        setToastData([
          { type: 'success', msg: ' Service updated!' }
        ]);
        setToastOpen(true);
      })
      .catch(() => {
        setToastData([
          { type: 'error', msg: ' An error occurred!' }
        ]);
        setToastOpen(true);
      }) 
  }

  return (
    <div className='grow'>
      {/* Panel body */}
      {toastOpen}
      <Toast2 type={toastType[0].type} open={toastOpen} setOpen={setToastOpen}>
        {toastType[0].msg}
      </Toast2>
      <div className='p-6 space-y-6'>{
        <DisplayServices 
          selectedSkills={myServices}
          onToggleService={toggleService}
          isSkill={false}
          onUpdatePivotFields={onUpdatePivotFields}
        />
      }</div>
    </div>
  );
}

export default ServicePanel;
