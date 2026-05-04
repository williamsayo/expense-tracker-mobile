import { ThemeKey } from "@/lib/theme/theme";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export function Spinner({
    size = "large",
    color = "neutral",
    ...props
}: ActivityIndicatorProps & { color: ThemeKey }) {
    const iconColor = useThemeColor(color);
    return <ActivityIndicator size={size} color={iconColor} {...props} />;
}