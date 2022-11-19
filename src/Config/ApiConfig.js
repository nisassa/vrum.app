import { QueryClient } from "react-query";
import Settings from "./Settings";

export const endpoints = {
    users: {
        login: () =>
            `${Settings.apiUrl}/api/auth/login`,
        profile: () =>
            `${Settings.apiUrl}/api/user/me`,
    },
    clients: {
        register: () =>
            `${Settings.apiUrl}/api/register/client`,
    },
    providers: {
        register: () =>
            `${Settings.apiUrl}/api/register/provider`,
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
