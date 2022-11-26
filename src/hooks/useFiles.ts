import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import CallApi from '../services/apiService';
import { AxiosResponse } from 'axios';

const usePhotoUpload = () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any>(
        (data) =>
            CallApi({
                url: endpoints.files.upload(),
                method: "POST",
                data: data,
                isProtected: true,
                headers: {'Content-Type': 'multipart/form-data'}
            }),
            {
                onSuccess: () => {
                    return queryClient.invalidateQueries('getProviderImages');
                }
            }
    );
};

export { usePhotoUpload };
