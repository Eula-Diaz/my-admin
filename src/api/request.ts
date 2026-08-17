import axios from "axios";

const request = axios.create({
  baseURL: "/api", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

request.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add authentication tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    console.log("API 请求成功");
    return response;
  },
  (error) => {
    // Handle response errors here
    const status = error.response.status;
    const url = error.config.url;
    if (status === 401 && !url.includes("/login")) {
      // Server responded with a status other than 2xx
      console.log("Token 失效");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default request;
