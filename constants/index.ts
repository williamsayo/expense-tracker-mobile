import { Platform } from "react-native";

export const BottomTabBarHeight = 70;

const LOCAL_BACKEND_BASE_URL = Platform.select({
    android: "http://192.168.137.1:8000/api/v1",
    default: "http://192.168.137.1:8000/api/v1",
});

export const BACKEND_BASE_URL =
	process.env.EXPO_PUBLIC_BACKEND_BASE_URL ?? LOCAL_BACKEND_BASE_URL;