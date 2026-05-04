import {
    getBudgetOverview,
    getExpenseOverview,
} from "@/lib/network/expensio";
import { useQuery } from "@tanstack/react-query";

export const useBudgetOverview = () =>
    useQuery({
        queryKey: ["budget-overview"],
        queryFn: getBudgetOverview,
    });

export const useExpenseOverview = () =>
    useQuery({
        queryKey: ["expense-overview"],
        queryFn: getExpenseOverview,
    });
