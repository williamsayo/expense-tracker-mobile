import { SignInForm } from "@/components/forms/onboarding/sign-in";
import { HeadingText, CaptionText } from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import Logo from "@/components/ui/Logo";

export function SignIn() {
    return (
        <>
            <ThemedView alignItems="center" gap={2}>
                <Logo />
                <ThemedView alignItems="center" gap={2}>
                    <HeadingText>Sign In</HeadingText>
                    <CaptionText color="muted">
                        Welcome back! Track your budgets and expenses
                    </CaptionText>
                </ThemedView>
            </ThemedView>
            <SignInForm />
        </>
    );
}
