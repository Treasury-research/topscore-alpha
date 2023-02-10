import axios from "axios";
import { baseURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL,
});

const knn3Token = typeof window !== 'undefined' && localStorage.getItem('knn3Token')

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
}, error => {
  const errObj = error.response.data
  console.log('error status code', errObj.statusCode)
});

export default api;