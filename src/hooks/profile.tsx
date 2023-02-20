import React, {
  Context,
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from 'react';

import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { endpoints } from '../config/apiConfig';
import CallApi from '../services/apiService';
import storage from '../auth/storage';
import { UserType } from '../types/client.interface';

interface IProfileContext {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean | undefined;
  isServiceProvider: boolean;
  isServiceProviderManager: boolean;
  isReady: boolean;
  saveUser: (user: any) => void;
  initLogOut: () => void;
  userLogin: (user: any) => void;
  restoreUserAndToken: () => void;
}

const USER_KEY = `User`;

export const ProfileContext = createContext<IProfileContext>({
  user: null,
  token: null,
  isAuthenticated: undefined,
  isServiceProvider: false,
  isServiceProviderManager: false,
  isReady: false,
  saveUser: () => {},
  initLogOut: () => {},
  userLogin: () => {},
  restoreUserAndToken: () => {}
}) as Context<IProfileContext>;

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: FC<any> = ({ children }) => {
  const { mutateAsync: login } = useLogin();

  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<any>();
  const [isReady, setIsReady] = useState<any>();

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    restoreToken();
  }, []);

  const restoreUser = async () => {
    const user = await storage.getUser();
    if (user) setUser(user);
  };

  const restoreToken = async () => {
    const token = await storage.getToken();
    setToken(token);
    setIsReady(true);
  };
  
  const initLogOut = async () => {
    setIsReady(false);
  };
  
  const saveUser = async (user: any) => {
    setUser(user);
    await storage.storeUser(user);
  };

  const restoreUserAndToken = async () => {
    await restoreToken();
    await restoreUser();
  };

  const userLogin = async (credentials: any) => {
    return await login(credentials);
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        token,
        isAuthenticated: typeof token === 'string' && token.length > 5,
        isServiceProvider:
          typeof user === 'object' && !isNaN(Number(user?.provider?.id)),
        isServiceProviderManager:
          typeof user === 'object' && user?.manager === 1,
        isReady,
        saveUser,
        initLogOut,
        userLogin,
        restoreUserAndToken
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.users.login(),
        method: 'POST',
        data: body,
        isProtected: false
      }),
    {
      onSuccess: async (response: any) => {
        if (
          typeof response.data.token !== 'undefined' &&
          response.data.token !== null
        ) {
          await storage.storeToken(response.data.token);
          await storage.storeUser(response.data.resource);
        } else {
          await storage.storeToken(null);
          await storage.storeUser(null);
        }
        return queryClient.invalidateQueries(USER_KEY);
      }
    }
  );
};

// export const updateProfile = () => {
//   const queryClient = useQueryClient();
//   return useMutation<AxiosResponse<unknown>, any>(
//     (body) =>
//       CallApi({
//         url: endpoints.user.update,
//         method: "PUT",
//         data: body,
//       }),
//     {
//       onSuccess: () => {
//         return queryClient.invalidateQueries(USER_KEY);
//       },
//       onError: () => {
//         console.log("Unable to save profile data");
//       },
//     }
//   );
// };
