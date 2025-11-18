import axios from "axios";

export const api = axios.create({
  baseURL: "https://travel-app-backend-9pto.onrender.com",
  withCredentials: true,
});
