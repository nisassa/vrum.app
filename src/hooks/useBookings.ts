import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import { UserType } from '../types/client.interface';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const CLIENT_KEY = 'getBookings';

interface IData {
  data: UserType[];
}

const useGetAllCategoriesServices = () => {
  return useQuery<AxiosResponse<unknown>, any>(`getCategoriesBy`, async () => {
    return await CallApi<any>({
      url: endpoints.bookings.groupby(),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.resource)
      .catch((err) => err);
  });
};

const useGetAllCities = () => {
  return useQuery<AxiosResponse<unknown>, any>(`getCities`, async () => {
    return await CallApi<any>({
      url: endpoints.bookings.cities(),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.cities)
      .catch((err) => err);
  });
};

const useGetProviders = (searchTerm: any, page: any) => {
  return useQuery<any>(
    [`getProvidersList`],
    async () => {
      const response = await CallApi<[]>({
        url:
          endpoints.bookings.providersList() +
          '?q=' +
          searchTerm +
          '&page=' +
          page,
        method: 'GET',
        isProtected: true
      });
      return response.data.providers;
    },

    { keepPreviousData: false, enabled: true }
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

export { useGetProviders, useGetAllCategoriesServices, useGetAllCities };
