import { Dashboard } from "@/components/screens/tabs/Dashboard";
import { ThemedContainer } from "@/components/themed/Container";
import { BottomTabBarHeight } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashBoardScreen() {
    const { top } = useSafeAreaInsets();

    return (
        <ThemedContainer
            scroll
            style={{
                marginTop: top,
                marginBottom: BottomTabBarHeight,
            }}
            pi={6}
            gap={6}
        >
            <Dashboard />
        </ThemedContainer>
    );
}
