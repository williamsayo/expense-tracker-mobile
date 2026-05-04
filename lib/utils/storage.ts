import { StorageKeys } from "@/constants/storage-keys";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import { asyncStorageError } from "./errors";

export const asyncDeleteItem = async (key: StorageKeys) => {
    try {
        await deleteItemAsync(StorageKeys[key]);
        return true;
    } catch (error) {
        throw asyncStorageError(
            `Error deleting item in AsyncStorage: ${error}`,
        );
    }
};

export const asyncSetItem = async (key: StorageKeys, value: string) => {
    try {
        await setItemAsync(StorageKeys[key], value);
        return true;
    } catch (error) {
        throw asyncStorageError(`Error setting item in AsyncStorage: ${error}`);
    }
};

export const asyncGetItem = async (
    key: StorageKeys,
): Promise<string | null> => {
    try {
        const value = await getItemAsync(StorageKeys[key]);
        return value;
    } catch (error) {
        throw asyncStorageError(
            `Error getting item from AsyncStorage: ${error}`,
        );
    }
};
