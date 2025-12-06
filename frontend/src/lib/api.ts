import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  googleLogin: async (accessToken: string) => {
    const response = await api.post("/auth/google", { accessToken });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const response = await api.put("/auth/me", data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put("/auth/change-password", data);
    return response.data;
  },
};

export const carsApi = {
  getAll: async () => {
    const response = await api.get("/cars");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },
};

export const paymentApi = {
  createPaymentIntent: async (amount: number) => {
    const response = await api.post("/payments/create-payment-intent", {
      amount,
    });
    return response.data;
  },
};

export const rentalsApi = {
  create: async (data: any) => {
    const response = await api.post("/rentals", data);
    return response.data;
  },
  getMyRentals: async () => {
    const response = await api.get("/rentals/my-rentals");
    return response.data;
  },
};

export default api;
