import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL = "http://10.12.216.113:8080";

const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
            config.headers = config.headers ?? {};
            // Note: axios header names are case-insensitive
            (config.headers as any)["Authorization"] = `Bearer ${token}`;
        }
    } catch (e) {
        // Silently continue without token if reading fails
    }
    return config;
});

export default api;
