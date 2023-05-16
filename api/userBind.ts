import axios from "axios";
import { baseBindURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL:baseBindURL,
});

const knn3Token = typeof window !== 'undefined' && localStorage.getItem('knn3Token')

// if(knn3Token){
//   api.defaults.headers.authorization = `Bearer ${knn3Token}`
// }

api.interceptors.response.use((res) => {
  return res;
  // if (res.data.code === 200) {
  //   return res;
  // } else {
  //   message.error(res.data.message);
  //   return null;
  // }
}, error => {
  const errObj = error.response.data
  console.log('error status code', errObj.statusCode)
});

export default api;