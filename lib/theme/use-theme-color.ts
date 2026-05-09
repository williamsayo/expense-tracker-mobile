import { appTheme as Theme, ThemeKey } from "./theme";
import { useCallback, useMemo } from "react";
import {
    ThemedViewBackgroundColor,
    ThemedViewBorderColor,
} from "@/components/themed/View/types";
import { useColorScheme } from "./use-color-scheme";

export function useTheme() {
    const colorScheme = useColorScheme();

    const getThemeColor = useCallback(
        (
            colorName: ThemeKey,
            overrides?: { light?: string; dark?: string },
        ) => {
            const colorFromProps = overrides?.[colorScheme];
            if (colorFromProps) return colorFromProps;

            return Theme.colors[colorScheme][colorName];
        },
        [colorScheme],
    );

    const getThemeBgAndBorderColor = useCallback(
        ({
            bgColor,
            borderColor,
            bgOverride,
            borderOverride,
        }: {
            bgColor?: ThemedViewBackgroundColor;
            bgOverride?: { light?: string; dark?: string };
            borderOverride?: { light?: string; dark?: string };
            borderColor?: ThemedViewBorderColor;
        }) => {
            const backgroundColor = useMemo(() => {
                if (bgColor === "transparent") {
                    return "transparent";
                }

                const bgSchemeColor: ThemeKey =
                    !bgColor || bgColor === "default"
                        ? "background"
                        : `${bgColor}Background`;

                return (
                    bgOverride?.[colorScheme] ??
                    Theme.colors[colorScheme][bgSchemeColor]
                );
            }, [bgColor, bgOverride, colorScheme]);

            const _borderColor = useMemo(() => {
                if (borderColor === "transparent") {
                    return "transparent";
                }

                const borderSchemeColor: ThemeKey =
                    !borderColor || borderColor === "default"
                        ? "border"
                        : `${borderColor}Border`;

                return (
                    borderOverride?.[colorScheme] ??
                    Theme.colors[colorScheme][borderSchemeColor]
                );
            }, [borderColor, borderOverride, colorScheme]);

            return {
                backgroundColor: backgroundColor,
                borderColor: _borderColor,
            };
        },
        [colorScheme],
    );

    return {
        getThemeColor,
        getThemeBgAndBorderColor,
        scheme: colorScheme,
    };
}

export function useThemeColor(
    colorName: ThemeKey,
    overrides?: { light?: string; dark?: string },
) {
    const colorScheme = useColorScheme();
    const theme = useMemo(() => {
        const colorFromProps = overrides?.[colorScheme];
        if (colorFromProps) {
            return colorFromProps;
        } else {
            return Theme.colors[colorScheme][colorName];
        }
    }, [colorScheme, overrides, colorName]);

    return theme;
}

export function useGetThemeColor() {
    const colorScheme = useColorScheme();
    const theme = useMemo(() => Theme.colors[colorScheme], [colorScheme]);

    return theme;
}
