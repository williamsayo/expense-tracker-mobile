import { SubmitExpenseFormData } from "@/components/forms/expense/expense-resolver";
import {
    addExpense,
    deleteExpense,
    getExpenses,
    updateExpense,
} from "@/lib/network/expensio";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExpenses = () =>
    useQuery({
        queryKey: ["expenses"],
        queryFn: getExpenses,
    });

export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createExpense"],
        mutationFn: (expenseData: SubmitExpenseFormData) => addExpense(expenseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateExpense"],
        mutationFn: ({
            id,
            expenseData,
        }: {
            id: string;
            expenseData: SubmitExpenseFormData;
        }) => updateExpense(id, expenseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteExpense"],
        mutationFn: (id: string) => deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });
};
