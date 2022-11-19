import { useMutation, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const useForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.users.forgotPassword(),
        method: 'POST',
        data: body
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('User');
      }
    }
  );
};


export { useForgotPassword };
