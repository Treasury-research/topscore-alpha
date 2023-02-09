import axios from "axios";
import { baseURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL,
});

const knn3Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgwYThlYTRkOGUzZTA2OGM2YjZhNDM1OGQ2ZjA2OGJiMDRhZDA0ZGRmIiwicHJvZmlsZUlkcyI6WzQ3MTMwLDU0NjEzLDkxNjEzLDQ3MTI3LDQ3MTA3XSwibGVuc1Byb2ZpbGVORlQiOnRydWUsImxlbnNSYWluYm93TkZUIjp0cnVlLCJpYXQiOjE2NzU5MDc3NTIsImV4cCI6MTY3NTkyNTc1Mn0.suDgxvAis62G-BlXWtnydmbCv5TdAawLGR9aSLl1t2U'

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