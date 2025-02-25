import axios, { CreateAxiosDefaults } from "axios";
import Cookies from 'js-cookie'
import { removeToken } from "../utils/helpers/removeToken";

const URL = import.meta.env.VITE_APP_URL_API;

const options: CreateAxiosDefaults = {
    baseURL: URL,
    withCredentials: true
}

export const axiosClassic = axios.create(options);

export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(consfig => {
    const token = Cookies.get('access_token');

    if(token) consfig.headers.Authorization = `Bearer ${token}`;

    return consfig;
},
error => {
    return Promise.reject(error);
})

axiosClassic.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status == 401){
            removeToken();
            document.location.href='/auth/start';
        }
    }
)