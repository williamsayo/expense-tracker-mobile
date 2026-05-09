import { ThemeKey } from "@/lib/theme/theme";

const buttonVariant = ["link", "solid", "outline", "ghost", "text"] as const;

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

const ButtonColorScheme = [
    "primary",
    "secondary",
    "subtle",
    "muted",
    "critical",
    "success",
    "warning",
] as const;

export const getBackgroundScheme = (scheme?: ButtonColorScheme): ThemeKey => {
    switch (scheme) {
        case "primary":
            return "primary";
        case "subtle":
            return "subtleBackground";
        case "muted":
            return "mutedBackground";
        case "secondary":
            return "secondary";
        case "critical":
            return "critical";
        case "success":
            return "successText";
        case "warning":
            return "warningText";
        default:
            return "background";
    }
};

export const getBorderScheme = (scheme?: ButtonColorScheme): ThemeKey => {
    switch (scheme) {
        case "primary":
            return "primary";
        case "secondary":
            return "secondary";
        case "subtle":
            return "subtleBorder";
        case "muted":
            return "mutedBackground";
        case "critical":
            return "criticalBorder";
        case "success":
            return "successBorder";
        case "warning":
            return "warning";
        default:
            return "border";
    }
};

export type ButtonInteractiveState = "pressed" | "disabled";
export type ButtonVariant = (typeof buttonVariant)[number];
export type ButtonColorScheme = (typeof ButtonColorScheme)[number];
