import { HexTransparencies } from "@/constants/hex-tranparencies";
import { borderRadius } from "@/lib/tokens";
import { Spacing } from "@/lib/spacing/spacing";
import { useColorScheme } from "@/lib/theme/use-color-scheme";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import DateTimePicker, {
    IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { useMemo } from "react";
import {
    GestureResponderEvent,
    Modal,
    Pressable,
    StyleSheet,
    ViewStyle,
} from "react-native";

export interface ThemedDatePicker extends IOSNativeProps {
    style?: ViewStyle;
    backdropOpacity?: HexTransparencies;
    visible?: boolean;
    onRequestClose: (event: GestureResponderEvent) => void;
}

export function ThemedDatePicker({
    value,
    onChange,
    onRequestClose,
    visible = false,
    mode = "date",
    display = "inline",
    backdropOpacity = 30,
    maximumDate,
    minimumDate,
    ...props
}: ThemedDatePicker) {
    const colorScheme = useColorScheme();
    const pickerBackgroundColor = useThemeColor("invertedBackground");
    const accentColor = useThemeColor("primary");
    const overlayBackground = useThemeColor("overlay");
    const invertedScheme = colorScheme === "dark" ? "light" : "dark";

    const pickerStyle: ViewStyle = useMemo(
        () => ({
            backgroundColor: pickerBackgroundColor,
            borderRadius: borderRadius.lg,
            padding: Spacing[2.5],
            fontSize: 8,
            boxShadow: `0 2px 8px 0 ${pickerBackgroundColor}4D`, // 4D is 30% opacity in hex
        }),
        [pickerBackgroundColor],
    );

    return (
        <Modal
            transparent
            navigationBarTranslucent
            statusBarTranslucent
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <Pressable
                style={[
                    styles.backdrop,
                    {
                        backgroundColor: `${overlayBackground}${HexTransparencies[backdropOpacity]}`,
                    },
                ]}
                onPress={onRequestClose}
            >
                <DateTimePicker
                    accentColor={accentColor}
                    display={display}
                    mode={mode}
                    onChange={onChange}
                    themeVariant={invertedScheme}
                    value={value}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    style={[pickerStyle]}
                    {...props}
                />
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
});
