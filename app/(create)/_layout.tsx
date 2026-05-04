import { ThemedButton } from "@/components/themed/Button";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";

export default function CreateLayout() {
    const router = useRouter();
    const backgroundColor = useThemeColor("background");
    const borderColor = useThemeColor("border");
    const mutedText = useThemeColor("mutedText");
    return (
        <Stack
            screenOptions={{
                animation: "none",
                headerShadowVisible: false,
                headerBackVisible: false,
                headerRight: ({ tintColor }) => (
                    <ThemedButton
                        size="icon"
                        rounded="full"
                        variant="link"
                        onPress={() => router.replace("/(app)/dashboard")}
                    >
                        <Ionicons
                            name="close-sharp"
                            size={20}
                            color={tintColor}
                        />
                    </ThemedButton>
                ),

                headerShown: true,
                headerStyle: {
                    backgroundColor,
                },
            }}
        >
            <Stack.Screen
                name="create-expense"
                options={{
                    headerTitle: "Create Expense",
                }}
            />
            <Stack.Screen
                name="create-budget"
                options={{
                    headerTitle: "Create Budget",
                }}
            />
        </Stack>
    );
}
