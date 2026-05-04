import { useMemo } from "react";
import type { ThemedTextColor } from "@/components/themed/Text/types";
import type {
    ThemedViewBackgroundColor,
    ThemedViewBorderColor,
} from "@/components/themed/View/types";

interface Props {
    isDisabled?: boolean;
    readOnly?: boolean;
    error?: string;
    success?: boolean;
    isActive: boolean;
}

export interface FieldColors {
    borderColor: ThemedViewBorderColor | undefined;
    backgroundColor: ThemedViewBackgroundColor;
    textColor: ThemedTextColor;
    placeholderColor?: "muted" | "placeholder";
}

export function useFieldColors({
    isDisabled,
    readOnly,
    error,
    success,
    isActive,
}: Props) {
    const colors: FieldColors = useMemo(() => {
        switch (true) {
            case isDisabled:
                return {
                    backgroundColor: "muted",
                    borderColor: undefined,
                    placeholderColor: "muted",
                    textColor: "muted",
                };
            case readOnly:
                return {
                    backgroundColor: "subtle",
                    borderColor: "subtle",
                    placeholderColor: "muted",
                    textColor: "default",
                };
            case typeof error === "string" && error.length > 0:
                return {
                    backgroundColor: "default",
                    borderColor: "critical",
                    placeholderColor: "muted",
                    textColor: "default",
                };
            case success:
                return {
                    backgroundColor: "default",
                    borderColor: "success",
                    placeholderColor: "muted",
                    textColor: "default",
                };
            case isActive:
                return {
                    backgroundColor: "default",
                    borderColor: "default",
                    placeholderColor: "muted",
                    textColor: "default",
                };
            default:
                return {
                    backgroundColor: "default",
                    borderColor: "subtle",
                    placeholderColor: "muted",
                    textColor: "subtle",
                };
        }
    }, [isDisabled, readOnly, error, success, isActive]);

    return colors;
}
