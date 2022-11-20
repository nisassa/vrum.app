import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import { ProviderType } from '../types/provider.interface';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const PROVIDERS_KEY = 'getProvider';

interface IData {
  data: ProviderType[];
}

const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.providers.register(),
        method: 'POST',
        data: body,
        isProtected: false
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(PROVIDERS_KEY);
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
