import { useTheme } from "@/lib/theme/use-theme-color";
import { ComponentProps, JSX, useMemo, useRef } from "react";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import {
    BorderRadius,
    borderRadius,
    Elevation,
    elevations,
    FontFamily,
    FontSize,
    fontSizes,
    mixins,
    typography,
} from "@/lib/tokens";
import {
    COMPONENT_SIZES,
    COMPONENT_SPACING,
    Spacing,
} from "@/lib/spacing/spacing";
import { Pressable, ViewStyle } from "react-native";
import { ThemeKey } from "@/lib/theme/theme";
import { Icon } from "@/components/ui/Icon";
import { useFieldFocused } from "../Field/useFieldFocus";
import { useFieldColors } from "../Field/useFieldColors";
import { ConditionalComponent } from "@/components/ConditionalComponent";
import { ThemedView } from "../View";
import { CaptionText, LabelText } from "../Text";
import { ThemedViewBackgroundColor } from "../View/types";

export interface ThemedDropdown<T> extends Omit<
    ComponentProps<typeof Dropdown>,
    "valueField" | "labelField" | "data" | "activeColor" | "renderItem"
> {
    data: T[];
    activeColor?: ThemedViewBackgroundColor;
    rounded?: BorderRadius;
    size?: keyof typeof COMPONENT_SIZES.input;
    fontSize?: FontSize;
    shadow?: Elevation;
    borderWidth?: number;
    fontFamily?: FontFamily;
    rightIcon?: JSX.Element;
    leftIcon?: JSX.Element;
    error?: string;
    hint?: string;
    hideLabel?: boolean;
    label?: string;
    containerProps?: ThemedView;
    labelField?: keyof T;
    valueField?: keyof T;
    iconColor?: ThemeKey;
}

export function ThemedDropdown<T>({
    data,
    value,
    onChange,
    rounded = "md",
    size = "md",
    labelField = "label" as keyof T,
    valueField = "value" as keyof T,
    borderWidth = 1,
    fontSize = "base",
    fontFamily,
    shadow,
    activeColor = "primary",
    rightIcon,
    leftIcon,
    onBlur,
    onFocus,
    error,
    hint,
    hideLabel = false,
    label,
    containerProps,
    iconColor = "border",
    showsVerticalScrollIndicator = false,
    maxHeight = 200,
    ...rest
}: ThemedDropdown<T>) {
    const { isActive, handleFocus, handleBlur } = useFieldFocused({
        onBlur,
        onFocus,
    });
    const colors = useFieldColors({
        error,
        isActive,
    });

    const dropdownRef = useRef<IDropdownRef>(null);

    const { getThemeBgAndBorderColor, getThemeColor } = useTheme();

    const { backgroundColor, borderColor } = getThemeBgAndBorderColor({
        bgColor: colors.backgroundColor,
        borderColor: colors.borderColor,
    });

    const placeHolderText = getThemeColor(
        colors.placeholderColor == undefined
            ? "placeholderText"
            : `${colors.placeholderColor}Text`,
    );
    const textColor = getThemeColor(
        colors.textColor === "default" ? "text" : `${colors.textColor}Text`,
    );

    const dropDownStyle = useMemo(() => {
        return {
            backgroundColor: backgroundColor,
            borderColor,
            borderWidth: borderWidth,
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            paddingHorizontal: Spacing[COMPONENT_SPACING.inputPadding.x],
            paddingVertical: Spacing[COMPONENT_SPACING.inputPadding.y],
            minHeight: COMPONENT_SIZES.input[size].minHeight,
            ...(fontSize !== undefined && { fontSize: fontSizes[fontSize] }),
        };
    }, [backgroundColor, borderColor, rounded, size]);

    const _fontSize = dropDownStyle.fontSize;

    const containerStyle = useMemo<ViewStyle>(
        () => ({
            ...(shadow !== undefined && { shadows: elevations[shadow] }),
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            marginTop: Spacing[0.5],
        }),
        [backgroundColor, borderColor, rounded],
    );

    const listItemContainer = useMemo<ViewStyle>(
        () => ({
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            marginHorizontal: Spacing[0.5],
            marginVertical: Spacing[0.5],
        }),
        [rounded],
    );

    const renderItem = (item: any, selected?: boolean) => (
        <Pressable
            onPress={() => {
                onChange(item[valueField]);
                dropdownRef.current?.close();
            }}
        >
            {({ pressed }) => (
                <ThemedView
                    pi={3}
                    pb={2.5}
                    rounded={rounded}
                    bgColor={selected || pressed ? activeColor : undefined}
                >
                    <LabelText
                        weight="normal"
                        color={selected || pressed ? "white" : "light"}
                    >
                        {item[labelField]}
                    </LabelText>
                </ThemedView>
            )}
        </Pressable>
    );

    return (
        <ThemedView {...containerProps} gap={2}>
            <ConditionalComponent condition={!hideLabel}>
                <LabelText color={colors.textColor}>{label}</LabelText>
            </ConditionalComponent>
            <Dropdown
                ref={dropdownRef}
                style={dropDownStyle}
                placeholderStyle={{
                    color: placeHolderText,
                    fontSize: _fontSize,
                }}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                containerStyle={containerStyle}
                itemContainerStyle={listItemContainer}
                selectedTextStyle={{
                    color: textColor,
                    fontSize: _fontSize,
                }}
                maxHeight={maxHeight}
                activeColor="transparent"
                onBlur={onBlur}
                onFocus={onFocus}
                renderLeftIcon={() => leftIcon ?? null}
                fontFamily={fontFamily && typography.fontFamily[fontFamily]}
                labelField={labelField}
                valueField={valueField}
                data={data}
                value={value}
                onChange={(data) => onChange(data[valueField])}
                autoScroll={false}
                renderItem={renderItem}
                flatListProps={{
                    style: {
                        borderRadius: borderRadius[rounded],
                        overflow: "hidden",
                    },
                }}
                renderRightIcon={() =>
                    rightIcon ?? (
                        <Icon
                            name="chevron-down-outline"
                            color={`${colors.textColor}Text` as ThemeKey}
                            size={16}
                        />
                    )
                }
                {...rest}
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
