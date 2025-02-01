import axios, { CreateAxiosDefaults } from "axios";

const URL = import.meta.env.VITE_APP_URL_API;

const options: CreateAxiosDefaults = {
    baseURL: URL,
    withCredentials: true
}

export const axiosClassic = axios.create(options);