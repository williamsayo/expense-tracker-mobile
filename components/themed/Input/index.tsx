import {
    useTheme,
} from "@/lib/theme/use-theme-color";
import {
    BlurEvent,
    FocusEvent,
    TextInput,
    TextInputProps,
    TextStyle,
} from "react-native";
import { ReactNode, useMemo } from "react";
import {
    BorderRadius,
    borderRadius,
    FontSize,
    fontSizes,
    typography,
} from "@/lib/tokens";
import {
    COMPONENT_SIZES,
    COMPONENT_SPACING,
    Spacing,
} from "@/lib/spacing/spacing";
import { InputSizes, ThemedInputColors } from "@/components/themed/Input/types";
import { ThemeKey } from "@/lib/theme/theme";
import { ThemedView } from "../View";
import { ConditionalComponent } from "@/components/ConditionalComponent";

export interface ThemedInput extends TextInputProps {
    containerStyle?: ThemedView;
    colors: ThemedInputColors;
    rounded?: BorderRadius;
    size?: InputSizes;
    handleBlur?: ((e: BlurEvent) => void) | undefined;
    handleFocus?: ((e: FocusEvent) => void) | undefined;
    isDisabled?: boolean;
    fontSize?: FontSize;
    rightAddon?: ReactNode;
    leftAddon?: ReactNode;
}

export function ThemedInput({
    colors,
    handleBlur,
    handleFocus,
    leftAddon,
    rightAddon,
    containerStyle,
    isDisabled = false,
    rounded = "md",
    size = "md",
    fontSize = "base",
    multiline,
    ...props
}: ThemedInput) {
    const { getThemeColor, getThemeBgAndBorderColor } = useTheme();
    const { backgroundColor, borderColor: _borderColor } =
        getThemeBgAndBorderColor({
            bgColor: colors.backgroundColor,
            borderColor: colors.borderColor,
        });

    const textSchemeColor: ThemeKey =
        colors?.textColor === "default" ? "text" : `${colors.textColor}Text`;

    const textColor = getThemeColor(textSchemeColor);
    const placeholderSchemeColor: ThemeKey = colors.placeholderColor
        ? `${colors.placeholderColor}Text`
        : textSchemeColor;
    const placeholderColor = getThemeColor(placeholderSchemeColor);
    const cursorColor = getThemeColor("text");

    const inputSize = COMPONENT_SIZES.input[size];
    const hasAddons = Boolean(leftAddon || rightAddon);

    const inputStyle: TextStyle = useMemo(() => {
        return {
            color: textColor,
            fontFamily: typography.fontFamily.regular,
            fontSize: fontSizes[fontSize],
            fontWeight: typography.fontWeight.normal,
            letterSpacing: typography.letterSpacing.normal,
            paddingVertical: Spacing[COMPONENT_SPACING.inputPadding.y],
            paddingHorizontal: Spacing[COMPONENT_SPACING.inputPadding.x],
            ...(_borderColor && {
                borderColor: hasAddons ? "transparent" : _borderColor,
            }),
            ...(backgroundColor && { backgroundColor }),
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            minHeight: multiline
                ? COMPONENT_SIZES.input.multiline.minHeight
                : inputSize.minHeight,
            borderWidth: 1,
            ...(hasAddons && { flex: 1 }),
        };
    }, [
        COMPONENT_SPACING.inputPadding.y,
        COMPONENT_SPACING.inputPadding.x,
        textColor,
        fontSize,
    ]);

    const Input = (
        <TextInput
            {...props}
            style={[props.style, inputStyle]}
            cursorColor={cursorColor}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor={placeholderColor}
            textAlign="left"
            onBlur={handleBlur}
            onFocus={handleFocus}
            editable={!isDisabled}
            multiline={multiline}
            accessible
        />
    );

    if (leftAddon || rightAddon) {
        return (
            <ThemedView
                alignItems="center"
                bgColor={colors.backgroundColor}
                borderColor={colors.borderColor}
                borderWidth={1}
                flexDirection="row"
                pie={COMPONENT_SPACING.inputPadding.x}
                rounded={rounded}
                {...containerStyle}
                gap={0.5}
            >
                <ConditionalComponent condition={Boolean(leftAddon)}>
                    {leftAddon}
                </ConditionalComponent>
                {Input}
                <ConditionalComponent condition={Boolean(rightAddon)}>
                    {rightAddon}
                </ConditionalComponent>
            </ThemedView>
        );
    }

    return Input;
}
