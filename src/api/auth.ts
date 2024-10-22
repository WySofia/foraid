import { axiosInstance } from '../lib/axios';

export const register = async (data: unknown) => {
    return axiosInstance.post('api/v1/register', data);
};

export const login = async (data: unknown) => {
    return axiosInstance.post('api/v1/login', data);
};

export const logout = async () => {
    return axiosInstance.post('api/v1/logout');
};

export const verify = async () => {
    return axiosInstance.get('api/v1/verify');
};
