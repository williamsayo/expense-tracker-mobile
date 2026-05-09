export const BottomTabBarHeight = 70;

const LOCAL_BACKEND_BASE_URL = `http://localhost:8000/api/v1`;

export const BACKEND_BASE_URL =
    process.env.EXPO_PUBLIC_BACKEND_BASE_URL ?? LOCAL_BACKEND_BASE_URL;