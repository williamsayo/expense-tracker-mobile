import HeaderButton from "@/components/HeaderButton";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function AuthLayout() {
    const backgroundColor = useThemeColor("background");
    const textColor = useThemeColor("text");

    return (
        <Stack
            screenOptions={{
                headerBackVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor,
                },
                contentStyle: { backgroundColor: "blue" },
                headerTintColor: textColor,
                headerTitle: () => "",
                headerRight: ({ tintColor }) => (
                    <HeaderButton size="icon">
                        <Ionicons
                            name="close-sharp"
                            size={20}
                            color={tintColor}
                        />
                    </HeaderButton>
                ),
            }}
        >
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
        </Stack>
    );
}
