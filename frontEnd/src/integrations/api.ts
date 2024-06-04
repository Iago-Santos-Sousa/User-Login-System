import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

// Crie uma instância do Axios com a URL base
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Adicione um interceptor de requisição
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token: string | null = sessionStorage.getItem("user.token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
