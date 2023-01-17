import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import { ProviderType } from '../types/provider.interface';
import { PhotoGalleryType } from '../types/photoGallery.interface';
import { ProviderStaffType } from '../types/staffMember.interface';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const PROVIDERS_KEY = 'getProvider';

interface PhotoGalleryData {
  data: PhotoGalleryType[];
}
interface ProviderStaffData {
  data: [];
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
const useUpdateProviderProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.providers.update(),
        method: 'POST',
        data: body,
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(PROVIDERS_KEY);
      }
    }
  );
};

const useProviderImages = () => {
  return useQuery<any>(
    [`getProviderImages`],
    async () => {
      const response = await CallApi<PhotoGalleryData[]>({
        url: endpoints.providers.getImages(),
        method: 'GET',
        isProtected: true
      });
      return response.data.resource;
    },
    { keepPreviousData: false, enabled: true }
  );
};

const useDeletePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (id) =>
      CallApi({
        url: endpoints.providers.deleteImages(id),
        method: 'DELETE',
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('getProviderImages');
      }
    }
  );
};

const useRegisterNewMember = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.providers.staff(),
        method: 'PUT',
        data: body,
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('getProviderStaff');
      }
    }
  );
};

const useGetAllMembers = (searchTerm: any, page: any) => {
  return useQuery<any>(
    [`getProviderStaff`],
    async () => {
      const response = await CallApi<[]>({
        url:
          endpoints.providers.paginate() + '?q=' + searchTerm + '&page=' + page,
        method: 'GET',
        isProtected: true
      });
      return response.data.users;
    },

    { keepPreviousData: false, enabled: true }
  );
};

const useToggleStaffSkill = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    ['toggle_staff_skill', id],
    (skill) =>
      CallApi({
        url: endpoints.providers.toggleStaffSkill(id, skill),
        method: 'POST',
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('getStaffById');
      }
    }
  );
};

const useMyServices = () => {
  return useQuery<AxiosResponse<unknown>, any>(`get_my_services`, async () => {
    return await CallApi<any>({
      url: endpoints.providers.myServices(),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.resource)
      .catch((err) => err);
  });
};

const useToggleMyService = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    ['toggle_provider_skill', id],
    (skill) =>
      CallApi({
        url: endpoints.providers.toggleMyService(id, skill),
        method: 'POST',
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('get_my_services');
      }
    }
  );
};

const useGetMemberById = (id: number) => {
  return useQuery<AxiosResponse<unknown>, any>(`getStaffById`, async () => {
    return await CallApi<any>({
      url: endpoints.providers.member(id),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.resource)
      .catch((err) => err);
  });
};

const useUpdateStaffUser = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    ['updateStaffUser', id],
    (body) =>
      CallApi({
        url: endpoints.providers.member(id),
        method: 'POST',
        data: body,
        isProtected: true
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(PROVIDERS_KEY);
      }
    }
  );
};

const useUpdateServicePivotFields = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    ['update_provider_service'],
    (body) =>
      CallApi({
        url: endpoints.providers.update_provider_service(),
        method: 'POST',
        data: body,
        isProtected: true
      })
  );
};

const useDeleteStaffUser = (id: number) => {
  const queryClient = useQueryClient();
  return useQuery<AxiosResponse<unknown>, any>(
    ['deleteStaffUser', id],
    () => {
      return CallApi<[]>({
        url: endpoints.providers.member(id),
        method: 'DELETE',
        isProtected: true
      })
        .then(({ data }) => queryClient.invalidateQueries('getProviderStaff'))
        .catch((err) => err);
    },
    { keepPreviousData: false, enabled: false }
  );
};

const useGetAllServices = () => {
  return useQuery<AxiosResponse<unknown>, any>(`getServices`, async () => {
    return await CallApi<any>({
      url: endpoints.providers.services(),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.resource)
      .catch((err) => err);
  });
};

const useGetServicesByCategories = () => {
  return useQuery<AxiosResponse<unknown>, any>(`getServices`, async () => {
    return await CallApi<any>({
      url: endpoints.providers.servicesByCat(),
      method: 'GET',
      isProtected: true
    })
      .then(({ data }) => data.resource)
      .catch((err) => err);
  });
};

// const useGetMemberById = (id: number) => {
//   return useQuery<AxiosResponse<unknown>, any>(
//     ['getStaffById', id],
//     () => {
//       return CallApi<[]>({
//         url: endpoints.providers.member(id),
//         method: 'GET',
//         isProtected: true
//       })
//         .then(({ data }) => data.resource)
//         .catch((err) => err);
//     },
//     { keepPreviousData: false, enabled: true }
//   );sss
// };
export {
  useRegister,
  useUpdateProviderProfile,
  useProviderImages,
  useDeletePhoto,
  useRegisterNewMember,
  useGetAllMembers,
  useGetMemberById,
  useUpdateStaffUser,
  useDeleteStaffUser,
  useGetAllServices,
  useGetServicesByCategories,
  useToggleStaffSkill,
  useMyServices,
  useToggleMyService,
  useUpdateServicePivotFields
};
