import { ThemedContainer } from "@/components/themed/Container";
import { ProfileForm } from "@/components/forms/profile";

export default function PersonalInformationScreen() {
    return (
        <ThemedContainer scroll pi={6}>
            <ProfileForm />
        </ThemedContainer>
    );
}
