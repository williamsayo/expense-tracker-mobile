import { type ReactNode } from "react";
import { ScrollView, type ScrollViewProps } from "react-native";
import { ThemedView } from "@/components/themed/View";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { ThemedViewBackgroundColor } from "../View/types";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedContainer extends Omit<ThemedView, "bgColor"> {
    centered?: boolean;
    children?: ReactNode;
    scroll?: boolean;
    safeInset?: boolean;
    scrollProps?: ScrollViewProps;
    bounces?: ScrollViewProps["bounces"];
    showsVerticalScrollIndicator?: ScrollViewProps["showsVerticalScrollIndicator"];
    bgColor?: Exclude<ThemedViewBackgroundColor, "transparent">;
}

export function ThemedContainer({
    scroll = false,
    safeInset = true,
    scrollProps = {},
    centered = true,
    style,
    children,
    bgColor = "default",
    bounces = false,
    showsVerticalScrollIndicator = false,
    ...props
}: ThemedContainer) {
    const backgroundColor = useThemeColor(
        bgColor === "default" ? "background" : `${bgColor}Background`,
    );

    const contentView = (
        <ThemedView
            alignSelf={centered ? "center" : undefined}
            bgColor={bgColor}
            flex={1}
            width="100%"
            style={style}
            {...props}
        >
            {children}
        </ThemedView>
    );

    if (scroll) {
        return (
            <ScrollView
                bounces={bounces}
                contentInsetAdjustmentBehavior={
                    safeInset ? "automatic" : "never"
                }
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                style={{ flex: 1, backgroundColor: backgroundColor }}
                {...scrollProps}
            >
                {contentView}
            </ScrollView>
        );
    }

    return safeInset ? (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            {contentView}
        </SafeAreaView>
    ) : (
        contentView
    );
}
