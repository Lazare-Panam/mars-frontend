import axios from "axios";

// Set NEXT_PUBLIC_API_BASE_URL in .env.local (e.g. http://localhost:5177/ for
// local dev). Falls back to the production API so existing deploys are
// unaffected if the var is unset.
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://mars-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";

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
