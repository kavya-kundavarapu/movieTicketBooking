// frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (data) => API.post("/auth/login", data);

export const bookTicket = (data, token) =>
  API.post("/booking/book", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
