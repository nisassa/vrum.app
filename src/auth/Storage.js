import  secureLocalStorage  from  "react-secure-storage";

const key = "authToken";
const userKey = "authUser";

const storeToken = async (authToken) => {
    try {
        await secureLocalStorage.setItem(key, authToken);
    } catch (error) {
        console.log("Error storing the auth token", error);
    }
};

const getToken = async () => {
    try {
        return await secureLocalStorage.getItem(key);
    } catch (error) {
        console.log("Error getting the auth token", error);
    }
};

const storeUser = async (user) => {
    try {
        await secureLocalStorage.getItem(userKey, JSON.stringify(user));
    } catch (error) {
        console.log("Error storing the auth user", error);
    }
};

const getUser = async () => {
    try {
        return await secureLocalStorage.getItem(userKey);
    } catch (error) {
        console.log("Error getting the auth token", error);
    }
};

const removeToken = async () => {
    try {
        await secureLocalStorage.delete(key);
        await secureLocalStorage.delete(userKey);
    } catch (error) {
        console.log("Error removing the auth token", error);
    }
};

export default {
    storeToken,
    getToken,
    storeUser,
    getUser,
    removeToken,
};
