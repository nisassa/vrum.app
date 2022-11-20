import { useMutation, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';
import {useProfile} from "./profile";
import storage from '../auth/storage';

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

const userPasswordReset = () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any>(
        (body) =>
            CallApi({
                url: endpoints.users.resetPassword(),
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

const useLogout = () => {
    const { restoreUserAndToken } = useProfile();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any>(
        (body) =>
            CallApi({
                url: endpoints.users.resetPassword(),
                method: 'POST',
                data: body
            }),
        {
            onSuccess: async () => {
                await storage.removeToken()
                await restoreUserAndToken()
                return queryClient.invalidateQueries('User');
            }
        }
    );
};


export {
    useForgotPassword,
    userPasswordReset,
    useLogout
};
