import axios from "axios";

// Plain instance for public endpoints (no token needed).
export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Secure instance: attaches the Express-API JWT (minted via POST /jwt and
// stored in localStorage after login) to every request's Authorization header.
export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosSecure.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the Express API ever responds 401/403, the stored token is stale
// (expired / mismatched) — clear it so the UI can prompt a fresh login.
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access-token");
      }
    }
    return Promise.reject(error);
  }
);
