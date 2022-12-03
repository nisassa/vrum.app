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
        return queryClient.invalidateQueries(PROVIDERS_KEY);
      }
    }
  );
};

const useGetAllMembers = () => {
  return useQuery<any>(
    [`getProviderStaff`],
    async () => {
      const response = await CallApi<[]>({
        url: endpoints.providers.paginate(),
        method: 'GET',
        isProtected: true
      });
      return response.data.users;
    },
    { keepPreviousData: false, enabled: true }
  );
};
export {
  useRegister,
  useUpdateProviderProfile,
  useProviderImages,
  useDeletePhoto,
  useRegisterNewMember,
  useGetAllMembers
};
