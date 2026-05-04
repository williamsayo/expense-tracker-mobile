import { ThemedView } from "../View";
import { ThemedInput } from ".";
import { ReactNode, RefObject } from "react";
import { TextInput, TextInputProps } from "react-native";
import { InputSizes } from "./types";
import { BorderRadius, mixins } from "@/lib/tokens";
import { ConditionalComponent } from "@/components/ConditionalComponent";
import { CaptionText, LabelText } from "../Text";
import { useFieldColors } from "../Field/useFieldColors";
import { useFieldFocused } from "../Field/useFieldFocus";
import { Spacing } from "@/lib/spacing/spacing";
import { Icon } from "@/components/ui/Icon";

export interface ThemedTextInput extends TextInputProps {
    containerProps?: ThemedView;
    error?: string;
    hideLabel?: boolean;
    hint?: string;
    label: string;
    isDisabled?: boolean;
    isOptional?: boolean;
    leftAddon?: ReactNode;
    rightAddon?: ReactNode;
    rounded?: BorderRadius;
    size?: InputSizes;
    success?: boolean;
    ref?: RefObject<TextInput | null>;
}

export function ThemedTextInput({
    hideLabel = false,
    label,
    error,
    hint,
    success,
    onBlur,
    onFocus,
    containerProps,
    isDisabled = false,
    readOnly = false,
    rounded,
    size,
    ...props
}: ThemedTextInput) {
    const { isActive, handleFocus, handleBlur } = useFieldFocused({
        onBlur,
        onFocus,
    });
    const colors = useFieldColors({
        error,
        isActive,
        isDisabled,
        readOnly,
        success,
    });

    return (
        <ThemedView {...containerProps} gap={2}>
            <ConditionalComponent condition={!hideLabel}>
                <LabelText color={colors.textColor}>{label}</LabelText>
            </ConditionalComponent>
            <ThemedInput
                accessibilityLabel={label}
                colors={colors}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
                isDisabled={isDisabled}
                readOnly={readOnly}
                rounded={rounded}
                size={size}
                {...props}
            />
            <ThemedView {...mixins.row} gap={2}>
                <ConditionalComponent condition={error !== undefined}>
                    <Icon
                        name="alert-circle-outline"
                        size={Spacing[4]}
                        color="criticalText"
                    />
                </ConditionalComponent>
                <CaptionText color={error ? "critical" : colors.textColor}>
                    {error || hint || <>&nbsp;</>}
                </CaptionText>
            </ThemedView>
        </ThemedView>
    );
}
