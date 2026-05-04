import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    PressableStateCallbackType,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import { ThemedView } from "../View";
import { ButtonText, ThemedText } from "../Text";
import {
    ButtonInteractiveState,
    ButtonColorScheme,
    ButtonSize,
    ButtonVariant,
    getBackgroundScheme,
    getBorderScheme,
} from "./types";
import { ReactNode, useCallback, useMemo } from "react";
import { BorderRadius, borderRadius, FontSize } from "@/lib/tokens";
import {
    COMPONENT_SIZES,
    COMPONENT_SPACING,
    Spacing,
} from "@/lib/spacing/spacing";
import { useTheme } from "@/lib/theme/use-theme-color";
import { HexTransparencies } from "@/constants/hex-tranparencies";

interface ButtonStyle {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    opacity?: number;
}

export interface ThemedButton extends Omit<PressableProps, "style"> {
    isLoading?: boolean;
    interactiveState?: ButtonInteractiveState;
    variant?: ButtonVariant;
    colorScheme?: ButtonColorScheme;
    size?: ButtonSize;
    textProps?: ThemedText;
    rounded?: BorderRadius;
    isIconButton?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    style?: ViewStyle;
    children: ReactNode;
}

export function ThemedButton({
    isLoading,
    interactiveState,
    variant = "solid",
    colorScheme,
    size,
    onPress,
    rounded = "md",
    textProps,
    children,
    isIconButton,
    fullWidth,
    style,
    leftIcon,
    rightIcon,
    ...props
}: ThemedButton) {
    const handlePress = (e: GestureResponderEvent) => {
        if (!isLoading && onPress) {
            onPress(e);
        }
    };

    const { getThemeColor } = useTheme();

    const solidTextColor = getThemeColor("invertedText");
    const textColor = getThemeColor(
        colorScheme ? `${colorScheme}Text` : "text",
    );
    const backgroundColor = getThemeColor(getBackgroundScheme(colorScheme));
    const borderColor = getThemeColor(getBorderScheme(colorScheme));

    const isDisabled = interactiveState === "disabled" || isLoading;

    const fontSize: FontSize = useMemo(() => {
        switch (size) {
            case "sm":
                return "sm";
            case "lg":
                return "lg";
            case "xl":
                return "xl";
            default:
                return "base";
        }
    }, [size]);

    const pressedHexTransparency = HexTransparencies[90];

    const buttonColors: Record<
        ButtonVariant,
        NonNullable<Omit<ButtonStyle, "opacity">> & {
            pressed?: ButtonStyle;
        }
    > = useMemo(
        () => ({
            ghost: {
                pressed: {
                    borderColor: "transparent",
                    textColor: `${textColor}${pressedHexTransparency}`,
                },
                backgroundColor: "transparent",
                borderColor: "transparent",
                textColor: textColor,
            },
            link: {
                backgroundColor: "transparent",
                borderColor: "transparent",
                textColor: textColor,
            },
            outline: {
                pressed: {
                    backgroundColor: `${backgroundColor}${HexTransparencies[20]}`,
                    borderColor: `${borderColor}${pressedHexTransparency}`,
                    textColor: `${textColor}${pressedHexTransparency}`,
                },
                backgroundColor: "transparent",
                borderColor: borderColor,
                textColor: textColor,
            },
            solid: {
                pressed: {
                    backgroundColor: `${backgroundColor}${HexTransparencies[90]}`,
                    textColor: `${solidTextColor}${pressedHexTransparency}`,
                },
                backgroundColor: backgroundColor,
                borderColor: "transparent",
                textColor: solidTextColor,
            },
            text: {
                backgroundColor: "transparent",
                borderColor: "transparent",
                textColor: textColor,
            },
        }),
        [
            variant,
            colorScheme,
            interactiveState,
            textColor,
            solidTextColor,
            pressedHexTransparency,
        ],
    );

    const colors = buttonColors[variant];

    const buttonStyle: ViewStyle = useMemo(
        () => ({
            alignItems: "center",
            opacity: isDisabled ? 0.6 : 1,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            borderWidth: variant === "outline" ? 2 : 0,
            flexDirection: "row",
            justifyContent: "center",
            minHeight: COMPONENT_SIZES.button[size || "md"].minHeight,
            minWidth: COMPONENT_SIZES.button[size || "md"].minWidth,
            paddingBlock:
                size === "icon"
                    ? 0
                    : Spacing[COMPONENT_SPACING.buttonPadding.y],
            paddingInline:
                size === "icon"
                    ? 0
                    : Spacing[COMPONENT_SPACING.buttonPadding.x],
            ...(fullWidth && { minWidth: undefined, width: "100%" }),
            ...(isIconButton && {
                width: COMPONENT_SIZES.button.icon.minWidth,
            }),
        }),
        [variant, colorScheme, interactiveState, rounded, size],
    );

    const getButtonTextStyle = useCallback(
        (pressed: boolean) => {
            const finalStyle: TextStyle = {
                color: colors.textColor,
            };
            if (typeof children === "string" && variant === "link") {
                finalStyle.textDecorationLine = "underline";
                finalStyle.textDecorationStyle = "solid";
                finalStyle.textDecorationColor = colors.textColor;
            }

            if (pressed && colors.pressed?.textColor) {
                finalStyle.color = colors.pressed.textColor;
            }

            return finalStyle;
        },
        [colors.pressed, colors.textColor, variant],
    );

    const pressableStyle = useCallback(
        ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
            const finalStyle = [buttonStyle, style];
            if (isDisabled) {
                finalStyle.push({ opacity: 0.5 });
            } else if (
                (pressed || interactiveState === "pressed") &&
                colors.pressed
            ) {
                finalStyle.push(colors.pressed);
            }
            return finalStyle;
        },
        [isDisabled, interactiveState, colors.pressed, buttonStyle, style],
    );

    return (
        <Pressable
            {...props}
            accessibilityRole={variant === "link" ? "link" : "button"}
            onPress={handlePress}
            accessibilityState={{ busy: isLoading, disabled: isDisabled }}
            style={pressableStyle}
            disabled={isDisabled}
        >
            {({ pressed }) => {
                return (
                    <ThemedView flexDirection="row" alignItems="center" gap={2}>
                        {isLoading ? (
                            <ActivityIndicator
                                color={colors.textColor}
                                size="small"
                            />
                        ) : (
                            leftIcon
                        )}

                        {typeof children === "string" ? (
                            <ButtonText
                                size={fontSize}
                                {...textProps}
                                style={[
                                    getButtonTextStyle(pressed),
                                    textProps?.style ?? {},
                                ]}
                            >
                                {children}
                            </ButtonText>
                        ) : (
                            children
                        )}

                        {rightIcon}
                    </ThemedView>
                );
            }}
        </Pressable>
    );
}
