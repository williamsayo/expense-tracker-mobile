import { SubmitBudgetFormData } from "@/components/forms/budget/budget-resolver";
import {
    addBudget,
    deleteBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
} from "@/lib/network/expensio";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBudget = (id: string) =>
    useQuery({
        queryKey: ["budget", id],
        queryFn: () => getBudgetById(id),
    });

export const useBudgets = () =>
    useQuery({
        queryKey: ["budgets"],
        queryFn: getAllBudgets,
    });

export const useCreateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createBudget"],
        mutationFn: (budgetData: SubmitBudgetFormData) => addBudget(budgetData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useUpdateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateBudget"],
        mutationFn: ({ id, budgetData }: { id: string; budgetData: SubmitBudgetFormData }) =>
            updateBudget(id, budgetData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteBudget"],
        mutationFn: (id: string) => deleteBudget(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};
