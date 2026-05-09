import { Profile } from "@/components/screens/tabs/Profile";
import { ThemedContainer } from "@/components/themed/Container";
import { BottomTabBarHeight } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const { top } = useSafeAreaInsets();
    return (
        <ThemedContainer
            scroll
            style={{
                marginTop: top,
                marginBottom: BottomTabBarHeight,
            }}
        >
            <Profile />
        </ThemedContainer>
    );
}
