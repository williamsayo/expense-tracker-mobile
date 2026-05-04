import { BudgetForm } from "@/components/forms/budget";
import { ThemedContainer } from "@/components/themed/Container";
import { HeadingText } from "@/components/themed/Text";

export default function CreateBudgetScreen() {
    return (
        <ThemedContainer scroll gap={4} pi={4}>
            <HeadingText>Create Budget</HeadingText>
            <BudgetForm />
        </ThemedContainer>
    );
}
