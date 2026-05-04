import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "@/context/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function RootWrapper() {
    const {
        auth: { isAuthenticated },
    } = useAuth();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen
                    name="index"
                    options={{
                        headerTitle: "Expensio",
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        animation: "slide_from_bottom",
                    }}
                />
            </Stack.Protected>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(app)" />
                <Stack.Screen
                    name="budget/[id]"
                    options={{
                        headerShown: true,
                        headerShadowVisible: false,
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                <Stack.Screen name="(create)" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const queryClient = new QueryClient();

    return (
        <AuthProvider>
            <GestureHandlerRootView>
                <QueryClientProvider client={queryClient}>
                    {/* <KeyboardProvider> */}
                    <SafeAreaProvider>
                        <ThemeProvider
                            value={
                                colorScheme === "dark"
                                    ? DarkTheme
                                    : DefaultTheme
                            }
                        >
                            <StatusBar style="auto" />
                            <RootWrapper />
                        </ThemeProvider>
                    </SafeAreaProvider>
                    {/* </KeyboardProvider> */}
                </QueryClientProvider>
            </GestureHandlerRootView>
        </AuthProvider>
    );
}
