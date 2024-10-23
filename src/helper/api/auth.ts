import { LoginData, RegisterData } from '../types/authData';

import { axiosInstance } from './axios';

export const registerReq = async (data: RegisterData) => {
    return axiosInstance.post('api/v1/register', data);
};

export const loginReq = async (data: LoginData) => {
    return axiosInstance.post('api/v1/login', data);
};

export const logoutReq = async () => {
    return axiosInstance.post('api/v1/logout');
};

export const verifyReq = async () => {
    return axiosInstance.get('api/v1/verify');
};
