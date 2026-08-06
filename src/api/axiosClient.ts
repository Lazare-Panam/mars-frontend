import axios from "axios";
const baseUrl =
  "https://mars-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";
//const baseUrl = "http://localhost:5177/";
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosClient;
