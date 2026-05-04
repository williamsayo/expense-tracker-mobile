import { Budget } from "@/components/screens/tabs/Budget";
import { ThemedContainer } from "@/components/themed/Container";

export default function BudgetScreen() {
    return (
        <ThemedContainer safeInset={false} pb={2} gap={4}>
            <Budget />
        </ThemedContainer>
    );
}
