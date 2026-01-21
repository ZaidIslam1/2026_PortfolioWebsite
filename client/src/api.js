import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // set in Vercel env vars
});

export default api;
