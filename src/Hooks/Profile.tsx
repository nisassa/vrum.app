import React, {
  Context,
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

import { AxiosResponse } from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { endpoints } from "../Config/ApiConfig";
import CallApi from "../Services/ApiService";

interface IProfileContext {
    user: any;
    token: string;
    isAuthenticated: boolean;
    saveUser: (user: any) => void;
    isReady: boolean;
}

const USER_KEY = `User`;

export const ProfileContext = createContext<IProfileContext>(
  null
) as Context<IProfileContext>;

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: FC = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    restoreToken();
  }, []);

  const isAuthenticated = !!user && !!token;

  const restoreUser = async () => {
    const user = await Store.getUser();
    if (user) setUser(JSON.parse(user));
  };

  const restoreToken = async () => {
    const token = await Store.getToken();
    if (token) setToken(token);
  };

  const saveUser = async (user: any) => {
    setUser(user);
    await Store.storeUser(user);
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        saveUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const updateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, any>(
    (body) =>
      CallApi({
        url: endpoints.user.update,
        method: "PUT",
        data: body,
      }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(USER_KEY);
      },
      onError: () => {
        console.log("Unable to save profile data");
      },
    }
  );
};

