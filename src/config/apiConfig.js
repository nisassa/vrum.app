import { QueryClient } from "react-query";
import settings from "./settings";

export const endpoints = {
    users: {
        login: () =>
            `${settings.apiUrl}/api/auth/login`,
        profile: () =>
            `${settings.apiUrl}/api/user/me`,
        forgotPassword: () =>
            `${settings.apiUrl}/api/auth/password/email`,
        resetPassword: () =>
            `${settings.apiUrl}/api/auth/password/reset`,
        logout: () =>
            `${settings.apiUrl}/api/auth/logout`,
    },
    clients: {
        register: () =>
            `${settings.apiUrl}/api/register/client`,
    },
    providers: {
        register: () =>
            `${settings.apiUrl}/api/register/provider`,
    },
    files: {
        upload: () =>
            `${settings.apiUrl}/api/upload`,
    }
};

const reactQueryConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
            cacheTime: 0,
        },
    },
};

export const ReactQueryClient = new QueryClient(reactQueryConfig);
