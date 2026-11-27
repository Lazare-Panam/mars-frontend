import axios from "axios";
import { rebrandImages } from "@/lib/kronoxImage";

// Set NEXT_PUBLIC_API_BASE_URL in .env.local (e.g. http://localhost:5177/ for
// local dev). Falls back to the production API so existing deploys are
// unaffected if the var is unset.
//const baseUrl = "http://localhost:5177/";
const baseUrl = "https://mars-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";

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

// Swap old MARS product photos in every API response for the rebranded ones.
axiosClient.interceptors.response.use((res) => {
  res.data = rebrandImages(res.data);
  return res;
});

export default axiosClient;
