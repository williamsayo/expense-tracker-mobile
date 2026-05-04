import { type RefObject, useMemo } from "react";
import { Platform, Text, type TextProps, type TextStyle } from "react-native";
import {
    type FontFamily,
    type FontSize,
    fontSizes,
    type FontWeight,
    typography,
} from "@/lib/tokens";
import { ThemedTextColor } from "./types";
import { Spacing } from "@/lib/spacing/spacing";
import { useTheme } from "@/lib/theme/use-theme-color";

export type ThemedText = TextProps & {
    // Typography
    size?: FontSize;
    weight?: FontWeight;
    align?: TextStyle["textAlign"];
    transform?: TextStyle["textTransform"];
    decoration?: TextStyle["textDecorationLine"];
    letterSpacing?: keyof typeof typography.letterSpacing;
    lineHeight?: keyof typeof typography.lineHeight;
    // Color
    lightColor?: string;
    darkColor?: string;
    color?: ThemedTextColor;
    // Spacing (for inline text)
    mbs?: Spacing;
    mbe?: Spacing;
    mis?: Spacing;
    mie?: Spacing;
    // Font family
    font?: FontFamily;
    // Other
    opacity?: TextStyle["opacity"];
    selectable?: boolean;
    numberOfLines?: number;
    ellipsizeMode?: TextProps["ellipsizeMode"];
    ref?: RefObject<Text | null>;
};

function ThemedText({
    // Typography
    size = "base",
    weight = "normal",
    letterSpacing = "normal",
    lineHeight = "normal",
    align,
    transform,
    decoration,
    // Color
    color = "default",
    lightColor,
    darkColor,
    // Spacing
    mbs,
    mbe,
    mis,
    mie,
    // Font family
    font = "display",
    // Other
    opacity,
    selectable,
    numberOfLines,
    ellipsizeMode,
    style,
    children,
    ...rest
}: ThemedText) {
    const { getThemeColor } = useTheme();
    const textColor = getThemeColor(
        color === "default" ? "text" : `${color}Text`,
    );

    const textStyle: TextStyle = useMemo(
        () => ({
            // Typography
            fontFamily: typography.fontFamily[font],
            fontSize: fontSizes[size],
            fontWeight:
                Platform.OS === "ios"
                    ? typography.fontWeight[weight]
                    : undefined,
            ...(align && { textAlign: align }),
            ...(transform && { textTransform: transform }),
            ...(decoration && { textDecorationLine: decoration }),
            // Color
            color: textColor,
            // Spacing
            letterSpacing: typography.letterSpacing[letterSpacing],
            lineHeight: Math.round(
                fontSizes[size] * typography.lineHeight[lineHeight],
            ),
            ...(mbs !== undefined && { marginBlockStart: Spacing[mbs] }),
            ...(mbe !== undefined && { marginBlockEnd: Spacing[mbe] }),
            ...(mis !== undefined && { marginInlineStart: Spacing[mis] }),
            ...(mie !== undefined && { marginInlineEnd: Spacing[mie] }),
            // Other
            ...(opacity !== undefined && { opacity }),
        }),
        [
            size,
            weight,
            font,
            align,
            transform,
            decoration,
            letterSpacing,
            lineHeight,
            textColor,
            mbs,
            Spacing,
            mbe,
            mis,
            mie,
            opacity,
        ],
    );

    return (
        <Text
            {...rest}
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            selectable={selectable}
            style={[textStyle, style]}
        >
            {children}
        </Text>
    );
}

export const HeadingText = (props: ThemedText) => (
    <ThemedText
        font="display"
        {...typography.headings.h1}
        {...props}
        accessibilityRole="header"
    />
);

export const SubheaderText = (props: ThemedText) => (
    <ThemedText font="primary" {...typography.headings.h5} {...props} />
);

export const BodyText = (props: ThemedText) => (
    <ThemedText font="primary" {...typography.body.md} {...props} />
);

export const CaptionText = (props: ThemedText) => (
    <ThemedText font="primary" {...typography.body.sm} {...props} />
);

export const ButtonText = (props: ThemedText) => (
    <ThemedText font="primary" {...typography.button.md} {...props} />
);

export const LabelText = (props: ThemedText) => (
    <ThemedText font="primary" {...typography.label.md} {...props} />
);
