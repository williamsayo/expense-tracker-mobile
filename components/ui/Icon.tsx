import { ThemeKey } from "@/lib/theme/theme";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleProp, TextStyle } from "react-native";

export function Icon({
    name,
    color = "primary",
    size = 16,
    style,
}: {
    name: ComponentProps<typeof Ionicons>["name"];
    size?: number;
    color?: ThemeKey;
    style?: StyleProp<TextStyle>;
}) {
    const iconColor = useThemeColor(color);
    return <Ionicons name={name} color={iconColor} size={size} style={style} />;
}
