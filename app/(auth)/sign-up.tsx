import { SignUp } from "@/components/screens/onboarding/sign-up";
import { ThemedContainer } from "@/components/themed/Container";

export default function SignUpScreen() {
    return (
        <ThemedContainer scroll pi={6} gap={6}>
            <SignUp />
        </ThemedContainer>
    );
}
