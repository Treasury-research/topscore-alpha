import axios from "axios";
import { baseURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL,
});

const knn3Token = typeof window !== 'undefined' && sessionStorage.getItem('knn3Token')

if(knn3Token){
  api.defaults.headers.authorization = `Bearer ${knn3Token}`
}

api.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    return res.data;
  } else {
    message.error(res.data.message);
    return null;
  }
});

export default api;