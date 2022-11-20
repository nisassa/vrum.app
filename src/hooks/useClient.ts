import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import { ClientType } from '../types/client.interface';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const CLIENT_KEY = 'getClient';

interface IData {
  data: ClientType[];
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

const useSingleTask = (id: number) => {
  // return useQuery<any>(`getSingleTask`, async () => {
  //     return await CallApi<any>({
  //         url: endpoints.tasks.updateByID(id),
  //         method: "GET",
  //     })
  //         .then(({ data }) => data)
  //         .catch((err) => err);
  // });
};

export { useRegister };
