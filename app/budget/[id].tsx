import { BudgetDetail } from "@/components/screens/tabs/Budget/Detail";
import { ThemedContainer } from "@/components/themed/Container";

export default function BudgetDetailScreen() {
    return (
        <ThemedContainer safeInset={false} pb={2}>
            <BudgetDetail />
        </ThemedContainer>
    );
}
