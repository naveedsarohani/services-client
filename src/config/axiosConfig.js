import axios from "axios";
// import { API_BASE_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
     Accept: "application/json",
  }


});
 axiosInstance.interceptors.response.use(
    (response) => {
        if(response.data?.message){
            toast.success(response.data.message);
        }
        return response;
    },(error) => {
        const msg = error.response?.data?.message || error.message;
        toast.error(msg);
    return Promise.reject(error);
    }
 )
export default axiosInstance;