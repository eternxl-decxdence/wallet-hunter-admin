import axios from "axios";

const api = axios.create({
  baseURL: "https://sjna6257v6.execute-api.eu-central-1.amazonaws.com/prod/api", // Укажи свой URL
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (
      error.response &&
      [401].includes(error.response.status) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = document.cookie
          .split(";")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1];

        if (refreshToken) {
          const response = await api.post("/admin/refreshToken");
          const newAccessToken = response.data.newAccessToken;

          localStorage.setItem("token", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("failed to refresh token:", refreshError);
        logout();
      }
    }
    return Promise.reject(error);
  }
);
export default api;

export function logout() {
  localStorage.removeItem("token");

  document.cookie = "refreshToken=; Max-Age=0; path=/;";
  window.location.href = "/";
}
