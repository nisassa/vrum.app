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
        data: body,
        isProtected: false
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('User');
      }
    }
  );
};

const usePasswordReset = () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any>(
        (body) =>
            CallApi({
                url: endpoints.users.resetPassword(),
                method: 'POST',
                data: body,
                isProtected: false
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
                url: endpoints.users.logout(),
                method: 'POST',
                data: body,
                isProtected: true,
            }),
        {
            onSuccess: async () => {
                await storage.removeToken()
                await restoreUserAndToken()
                return queryClient.invalidateQueries('User');
            },
            onError: async () => {
                await storage.removeToken()
                await restoreUserAndToken()
                return queryClient.invalidateQueries('User');
            },

        }
    );
};


export {
    useForgotPassword,
    usePasswordReset,
    useLogout
};
