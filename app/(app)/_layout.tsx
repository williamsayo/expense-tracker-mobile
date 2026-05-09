import { Tabs } from "expo-router";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import Logo from "@/components/ui/Logo";
import { LabelText } from "@/components/themed/Text";
import HeaderButton from "@/components/HeaderButton";
import { Spacing } from "@/lib/spacing/spacing";
import { BottomTabBarHeight } from "@/constants";
import { BlurView } from "expo-blur";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/context/auth";

export default function AppLayout() {
    const primaryColor = useThemeColor("primary");
    const backgroundColor = useThemeColor("background");
    const borderColor = useThemeColor("border");
    const mutedText = useThemeColor("mutedText");

    const { logout } = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerLeft: () => (
                    <HeaderButton href="/(app)/dashboard">
                        <Logo size={40} />
                        <LabelText color="primary">Expensio</LabelText>
                    </HeaderButton>
                ),
                headerRight: () => (
                    <HeaderButton href="/(app)/profile" size="icon">
                        <Icon name="person-circle-outline" size={35} />
                    </HeaderButton>
                ),
                headerLeftContainerStyle: {
                    paddingLeft: Spacing[1],
                },
                headerRightContainerStyle: {
                    paddingRight: Spacing[4],
                },
                headerStyle: {
                    backgroundColor,
                    shadowColor: borderColor,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    minHeight: 90,
                },
                tabBarButton: HapticTab,
                tabBarBackground: () => (
                    <BlurView
                        tint="systemUltraThinMaterialLight"
                        intensity={40}
                        style={StyleSheet.absoluteFill}
                    />
                ),
                tabBarActiveTintColor: primaryColor,
                tabBarInactiveTintColor: mutedText,
                tabBarStyle: {
                    shadowColor: borderColor,
                    shadowOffset: { width: 0, height: -1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    height: BottomTabBarHeight,
                    ...Platform.select({
                        ios: {
                            position: "absolute",
                        },
                    }),
                },
                tabBarIconStyle: {
                    height: 30,
                    width: "auto",
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    headerTitle: () => "",
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name={focused ? "grid" : "grid-outline"}
                            size={size}
                            color="primary"
                        />
                    ),
                    title: "Dashboard",
                    tabBarLabel: "Dashboard",
                }}
            />
            <Tabs.Screen
                name="budget"
                options={{
                    headerTitle: () => "",
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name={focused ? "wallet" : "wallet-outline"}
                            size={size}
                            color="primary"
                        />
                    ),
                    title: "Budgets",
                    tabBarLabel: "Budgets",
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    headerTitle: () => "",
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name={focused ? "receipt-sharp" : "receipt-outline"}
                            size={size}
                            color="primary"
                        />
                    ),
                    title: "Expenses",
                    tabBarLabel: "Expenses",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerTitle: () => "",
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name={focused ? "person-sharp" : "person-outline"}
                            size={size}
                            color="primary"
                        />
                    ),
                    title: "Profile",
                    tabBarLabel: "Profile",
                }}
            />
        </Tabs>
    );
}
