import axios from "axios";
//const baseUrl = "https://mars-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";
const baseUrl = "http://localhost:5177/"; 
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
