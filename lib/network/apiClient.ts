import { BACKEND_BASE_URL } from "@/constants";
import axios from "axios";
import { asyncDeleteItem, asyncGetItem } from "../utils/storage";

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

export const api = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    queue.push((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = await asyncGetItem("REFRESH_TOKEN");
                const res = await api.post("/auth/refresh-token", {
                    refresh_token: refreshToken,
                });

                const {
                    data: { access_token },
                } = res;
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${access_token}`;

                // flush queued requests with new token
                queue.forEach((cb) => cb(access_token));
                queue = [];

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // refresh failed — log user out
                queue = [];
                await Promise.all([
                    asyncDeleteItem("AUTH_TOKEN"),
                    asyncDeleteItem("REFRESH_TOKEN"),
                ]);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    },
);
