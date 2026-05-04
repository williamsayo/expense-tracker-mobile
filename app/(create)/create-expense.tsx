import { ExpenseForm } from "@/components/forms/expense";
import { ThemedContainer } from "@/components/themed/Container";
import { HeadingText } from "@/components/themed/Text";

export default function CreateExpenseScreen() {
    return (
        <ThemedContainer scroll gap={4} pi={4}>
            <HeadingText>Log Expense</HeadingText>
            <ExpenseForm />
        </ThemedContainer>
    );
}
