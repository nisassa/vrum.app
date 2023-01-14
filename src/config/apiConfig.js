import { QueryClient } from 'react-query';
import settings from './settings';

export const endpoints = {
  users: {
    login: () => `${settings.apiUrl}/api/auth/login`,
    profile: () => `${settings.apiUrl}/api/user/me`,
    forgotPassword: () => `${settings.apiUrl}/api/auth/password/email`,
    resetPassword: () => `${settings.apiUrl}/api/auth/password/reset`,
    logout: () => `${settings.apiUrl}/api/auth/logout`
  },
  clients: {
    register: () => `${settings.apiUrl}/api/register/client`
  },
  providers: {
    register: () => `${settings.apiUrl}/api/register/provider`,
    update: () => `${settings.apiUrl}/api/provider`,
    getImages: () => `${settings.apiUrl}/api/provider/photo-gallery`,
    deleteImages: (id) => `${settings.apiUrl}/api/provider/photo-gallery/${id}`,
    staff: () => `${settings.apiUrl}/api/provider/staff`,
    paginate: () => `${settings.apiUrl}/api/provider/staff/paginate`,
    member: (id) => `${settings.apiUrl}/api/provider/staff/${id}`,
    services: () => `${settings.apiUrl}/api/provider/service-types/`,
    servicesByCat: () => `${settings.apiUrl}/api/services/groupby/categories`
  },

  files: {
    upload: () => `${settings.apiUrl}/api/upload`
  }
};

const reactQueryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      cacheTime: 0
    }
  }
};

export const ReactQueryClient = new QueryClient(reactQueryConfig);
