import axios from "axios";
import { API_BASE_URL, USER_ID } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "user-id": USER_ID, // set for predefined user
  },
});

export default axiosInstance;
