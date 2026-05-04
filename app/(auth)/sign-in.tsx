import { SignIn } from "@/components/screens/onboarding/sign-in";
import { ThemedContainer } from "@/components/themed/Container";

export default function SignInScreen() {
    return (
        <ThemedContainer pi={6} gap={6}>
            <SignIn />
        </ThemedContainer>
    );
}
