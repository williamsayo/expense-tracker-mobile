const ErrorTypes = ["VALIDATION_ERROR", "ASYNC_STORAGE_ERROR"] as const;

type ErrorTypes = (typeof ErrorTypes)[number];

export class AppError extends Error {
    constructor(
        message: string,
        public errorType: ErrorTypes,
    ) {
        super(message);
        this.errorType = errorType;
        this.name = "AppError";
    }
}

export function asyncStorageError(message: string) {
    return new AppError(message, "ASYNC_STORAGE_ERROR");
}
