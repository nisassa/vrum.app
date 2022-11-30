import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import { UserType } from '../types/client.interface';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const CLIENT_KEY = 'getClient';

interface IData {
  data: UserType[];
}

const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.clients.register(),
        method: 'POST',
        data: body,
        isProtected: false
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(CLIENT_KEY);
      }
    }
  );
};

const useUpdateClientProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.users.profile(),
        method: 'POST',
        data: body,
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(CLIENT_KEY);
      }
    }
  );
};
const useDeleteClientProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.users.profile(),
        method: 'delete',
        data: body,
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(CLIENT_KEY);
      }
    }
  );
};

// const getClientProfile = (id: number) => {
//   return (
//     useQuery <
//     AxiosResponse<unknown>(`getClientProfile`, async () => {
//       return await CallApi<any>({
//         url: endpoints.users.profile(),
//         method: 'GET'
//       })
//         .then(({ data }) => data)
//         .catch((err) => err);
//     })
//   );
// };

// const useSingleTask = () => {
//   return useQuery<any>(`getSingleTask`, async () => {
//     return await CallApi<any>({
//       url: endpoints.users.profile(),
//       method: 'GET',
//       isProtected: true
//     })
//       .then(({ data }) => data)
//       .catch((err) => err);
//   });
// };

// const useSingleTask = (id: number) => {
// return useQuery<any>(`getSingleTask`, async () => {
//     return await CallApi<any>({
//         url: endpoints.tasks.updateByID(id),
//         method: "GET",
//     })
//         .then(({ data }) => data)
//         .catch((err) => err);
// });
// };

export { useRegister, useUpdateClientProfile, useDeleteClientProfile };
