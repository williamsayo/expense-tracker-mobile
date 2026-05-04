export const StorageKeys = {
    AUTH_TOKEN: "authToken",
    REFRESH_TOKEN: "refreshToken",
    USER: "user",
} as const;

export type StorageKeys = keyof typeof StorageKeys;
