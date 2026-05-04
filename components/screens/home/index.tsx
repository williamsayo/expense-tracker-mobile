import { Link } from "expo-router";
import { ThemedButton } from "@/components/themed/Button";
import { ThemedView } from "@/components/themed/View";
import { CaptionText, HeadingText } from "@/components/themed/Text";

export function Home() {
    return (
        <>
            <ThemedView
                flex={1}
                justifyContent="center"
                alignItems="center"
                gap={1}
            >
                <HeadingText align="center" size="2xl">
                    Track Your Expenses. Control Your Finances.
                </HeadingText>
                <CaptionText>Track expenses with smart insights.</CaptionText>
            </ThemedView>
            <ThemedView gap={2}>
                <Link href="/(app)/dashboard" asChild>
                    <ThemedButton variant="outline" colorScheme="success">
                        Dashboard
                    </ThemedButton>
                </Link>
                <Link href="/(auth)/sign-in" asChild>
                    <ThemedButton>Login</ThemedButton>
                </Link>
                <Link href="/(auth)/sign-up" asChild>
                    <ThemedButton variant="outline">Register</ThemedButton>
                </Link>
            </ThemedView>
        </>
    );
}
