import {
    borderRadius,
    BorderRadius,
    Elevation,
    elevations,
} from "@/lib/tokens";
import { Spacing } from "@/lib/spacing/spacing";
import { View, ViewProps, ViewStyle } from "react-native";
import {
    ThemedViewBackgroundColor,
    ThemedViewBorderColor,
} from "@/components/themed/View/types";
import { RefObject, useMemo } from "react";
import { useTheme } from "@/lib/theme/use-theme-color";

export interface ThemedView extends ViewProps {
    p?: Spacing;
    pb?: Spacing;
    pbs?: Spacing;
    pbe?: Spacing;
    pi?: Spacing;
    pis?: Spacing;
    pie?: Spacing;
    m?: Spacing;
    mb?: Spacing;
    mbs?: Spacing;
    mbe?: Spacing;
    mi?: Spacing;
    mis?: Spacing;
    mie?: Spacing;
    // Layout styles
    flex?: number;
    flexDirection?: ViewStyle["flexDirection"];
    justifyContent?: ViewStyle["justifyContent"];
    alignItems?: ViewStyle["alignItems"];
    alignSelf?: ViewStyle["alignSelf"];
    flexWrap?: ViewStyle["flexWrap"];
    gap?: Spacing;
    // Dimensions
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    minWidth?: ViewStyle["minWidth"];
    minHeight?: ViewStyle["minHeight"];
    maxWidth?: ViewStyle["maxWidth"];
    maxHeight?: ViewStyle["maxHeight"];
    // Visual
    rounded?: BorderRadius;
    shadow?: Elevation;
    opacity?: ViewStyle["opacity"];
    // Border
    borderWidth?: number;
    borderLightColor?: string;
    borderDarkColor?: string;
    borderColor?: ThemedViewBorderColor;
    borderTopWidth?: number;
    borderRightWidth?: number;
    borderBottomWidth?: number;
    borderLeftWidth?: number;
    // background
    backgroundLightColor?: string;
    backgroundDarkColor?: string;
    bgColor?: ThemedViewBackgroundColor;
    // Position
    position?: ViewStyle["position"];
    top?: ViewStyle["top"];
    bottom?: ViewStyle["bottom"];
    left?: ViewStyle["left"];
    right?: ViewStyle["right"];
    zIndex?: ViewStyle["zIndex"];
    // Other
    overflow?: ViewStyle["overflow"];
    ref?: RefObject<View | null>;
}

export function ThemedView({
    p,
    pb,
    pbs,
    pbe,
    pi,
    pis,
    pie,
    m,
    mb,
    mbs,
    mbe,
    mi,
    mis,
    mie,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    alignSelf,
    flexWrap,
    gap,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    // background
    bgColor,
    backgroundLightColor,
    backgroundDarkColor,
    // visual
    rounded,
    shadow,
    opacity,
    // border
    borderWidth,
    borderDarkColor,
    borderLightColor,
    borderColor,

    bottom,
    top,
    left,
    right,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    position,
    zIndex,
    overflow,
    style,
    ...props
}: ThemedView) {
    const { getThemeBgAndBorderColor } = useTheme();
    const { backgroundColor, borderColor: _borderColor } =
        getThemeBgAndBorderColor({
            bgColor,
            borderColor,
            bgOverride: {
                light: backgroundLightColor,
                dark: backgroundDarkColor,
            },
            borderOverride: {
                light: borderLightColor,
                dark: borderDarkColor,
            },
        });

    const viewStyle: ViewStyle = useMemo(
        () => ({
            //
            ...(p !== undefined && { padding: Spacing[p] }),
            ...(pb !== undefined && { paddingBlock: Spacing[pb] }),
            ...(pbs !== undefined && { paddingBlockStart: Spacing[pbs] }),
            ...(pbe !== undefined && { paddingBlockEnd: Spacing[pbe] }),
            ...(pi !== undefined && { paddingInline: Spacing[pi] }),
            ...(pie !== undefined && { paddingInlineEnd: Spacing[pie] }),
            ...(pis !== undefined && { paddingInlineStart: Spacing[pis] }),
            ...(m !== undefined && { margin: Spacing[m] }),
            ...(mb !== undefined && { marginBlock: Spacing[mb] }),
            ...(mbs !== undefined && { marginBlockStart: Spacing[mbs] }),
            ...(mbe !== undefined && { marginBlockEnd: Spacing[mbe] }),
            ...(mi !== undefined && { marginInline: Spacing[mi] }),
            ...(mis !== undefined && { marginInlineStart: Spacing[mis] }),
            ...(mie !== undefined && { marginInlineEnd: Spacing[mie] }),
            //
            ...(flex !== undefined && { flex }),
            ...(flexDirection && { flexDirection }),
            ...(justifyContent && { justifyContent }),
            ...(alignItems && { alignItems }),
            ...(alignSelf && { alignSelf }),
            ...(flexWrap && { flexWrap }),
            ...(gap !== undefined && { gap: Spacing[gap] }),
            //
            ...(height !== undefined && { height }),
            ...(minHeight !== undefined && { minHeight }),
            ...(maxHeight !== undefined && { maxHeight }),
            ...(width !== undefined && { width }),
            ...(minWidth !== undefined && { minWidth }),
            ...(maxWidth !== undefined && { maxWidth }),
            //
            ...(backgroundColor && { backgroundColor }),
            ...(rounded !== undefined && {
                borderRadius: borderRadius[rounded],
            }),
            ...(shadow && elevations[shadow]),
            ...(opacity !== undefined && { opacity }),
            //
            ...(_borderColor && { borderColor: _borderColor }),
            ...(borderWidth !== undefined && { borderWidth }),
            ...(borderTopWidth !== undefined && { borderTopWidth }),
            ...(borderRightWidth !== undefined && { borderRightWidth }),
            ...(borderBottomWidth !== undefined && { borderBottomWidth }),
            ...(borderLeftWidth !== undefined && { borderLeftWidth }),
            //
            ...(position && { position }),
            ...(top !== undefined && { top }),
            ...(bottom !== undefined && { bottom }),
            ...(left !== undefined && { left }),
            ...(right !== undefined && { right }),
            ...(zIndex !== undefined && { zIndex }),
            //
            ...(overflow && { overflow }),
        }),
        [
            p,
            Spacing,
            pb,
            pbs,
            pbe,
            pi,
            pie,
            pis,
            m,
            mb,
            mbs,
            mbe,
            mi,
            mis,
            mie,
            flex,
            flexDirection,
            justifyContent,
            alignItems,
            alignSelf,
            flexWrap,
            gap,
            height,
            minHeight,
            maxHeight,
            width,
            minWidth,
            maxWidth,
            backgroundColor,
            rounded,
            shadow,
            opacity,
            _borderColor,
            borderWidth,
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
            position,
            top,
            bottom,
            left,
            right,
            zIndex,
            overflow,
        ],
    );

    return <View {...props} style={[viewStyle, style]} />;
}
