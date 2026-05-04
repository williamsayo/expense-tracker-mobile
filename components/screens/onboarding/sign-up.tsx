import { SignUpForm } from "@/components/forms/onboarding/sign-up";
import { CaptionText, HeadingText } from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import Logo from "@/components/ui/Logo";

export function SignUp() {
    return (
        <>
            <ThemedView alignItems="center" gap={2}>
                <Logo />
                <ThemedView alignItems="center" gap={2}>
                    <HeadingText>Sign Up</HeadingText>
                    <CaptionText color="muted">
                        Join to start tracking expenses
                    </CaptionText>
                </ThemedView>
            </ThemedView>
            <SignUpForm />
        </>
    );
}
