import { axiosInstance } from '..//lib/axios';

export const getCasos = async () => {
    return axiosInstance.get('api/v1/casos');
};
