import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:7800/api" : "/api",
    withCredentials: true,
})


export default AxiosInstance;