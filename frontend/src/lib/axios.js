import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL:import.meta.mode ==="development" ? "https://dukaan-fsl6.onrender.com/api" : "/api",
    withCredentials:true,
})


export default AxiosInstance;
