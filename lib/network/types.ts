export interface Expense {
    id: string;
    name: string;
    amount: number;
    category: Category;
    currency: Currency;
    date: string;
}

export interface Budget {
    id: string;
    name?: string;
    totalAmount: number;
    amountSpent: number;
    usedPercentage: number;
    remainingPercentage: number;
    startDate: string;
    endDate: string;
    currency: Currency;
    allocations: BudgetAllocation[];
}

export interface BudgetAllocation {
    id: string;
    allocatedAmount: number;
    category: Category;
    amountSpent: number;
    usedPercentage: number;
    remainingPercentage: number;
}

export interface BudgetOverview {
    recentBudgets: Budget[];
    activeBudget?: Budget | null;
    upcomingBudget: Budget;
    totalAllocated: number;
}

export interface ExpenseOverview {
    recentExpenses: Expense[];
    highestExpense: Expense;
    totalSpent: number;
}

export const Currency = ["USD", "EUR", "GBP", "NGN", "GHS"] as const;

export const Category = [
    "food",
    "health",
    "rent",
    "utilities",
    "transport",
    "entertainment",
    "other",
] as const;

export type Currency = (typeof Currency)[number];
export type Category = (typeof Category)[number];
