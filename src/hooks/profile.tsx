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

interface IProfileContext {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  saveUser: (user: any) => void;
  userLogin: (user: any) => void;
  restoreUserAndToken: () => void;
}

const USER_KEY = `User`;

export const ProfileContext = createContext<IProfileContext>({
  user: null,
  token: null,
  isAuthenticated: false,
  saveUser: () => {},
  userLogin: () => {},
  restoreUserAndToken: () => {},
}) as Context<IProfileContext>;

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: FC<any> = ({ children }) => {

  const { mutateAsync: login } = useLogin();

  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<any>();

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    restoreToken();
  }, []);

  const isAuthenticated = !!user && !!token;

  const restoreUser = async () => {
    const user = await storage.getUser();
    if (user) setUser(user);
  };

  const restoreToken = async () => {
    const token = await storage.getToken();
    if (token) setToken(token);
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
        isAuthenticated,
        saveUser,
        userLogin,
        restoreUserAndToken,
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
        data: body
      }),
    {
      onSuccess: async (response: any) => {
          if (typeof response.data?.token !== 'undefined') {
              await storage.storeToken(response.data?.token)
              await storage.storeUser(response.data?.resource)
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
