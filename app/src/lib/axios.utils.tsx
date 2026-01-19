//@ts-nocheck
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Api = {
  get: (url, params) => instance.get(url, { params }).then(r => r.data),
  post: (url, data, params) => instance.post(url, data, { params }).then(r => r.data),
  put: (url, data, params) => instance.put(url, data, { params }).then(r => r.data),
  delete: (url, params) => instance.delete(url, { params }).then(r => r.data),
};

export default Api;
