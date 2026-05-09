import { SubmitBudgetFormData } from "@/components/forms/budget/budget-resolver";
import { api } from "./apiClient";
import {
    Budget,
    BudgetOverview,
    Expense,
    ExpenseOverview,
    Profile,
} from "./types";
import { SubmitExpenseFormData } from "@/components/forms/expense/expense-resolver";
import { AxiosError } from "axios";

// Expense APIs'
export async function getExpenses(): Promise<Expense[]> {
    const res = await api.get(`/expenses`);
    return res.data;
}

export async function addExpense(
    data: SubmitExpenseFormData,
): Promise<Expense> {
    try {
        const res = await api.post(`/expenses`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error adding expense:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function updateExpense(
    id: string,
    data: SubmitExpenseFormData,
): Promise<Expense> {
    try {
        const res = await api.put(`/expenses/${id}`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updating expense:", error?.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function deleteExpense(id: string): Promise<undefined> {
    try {
        await api.delete(`/expenses/${id}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting expense:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}
// Budget APIs

export async function getBudgetById(id: string): Promise<Budget> {
    try {
        const res = await api.get(`/budgets/${id}`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching budget:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function getAllBudgets(): Promise<Budget[]> {
    try {
        const res = await api.get(`/budgets`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching all budgets:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function addBudget(data: SubmitBudgetFormData): Promise<Budget> {
    try {
        const res = await api.post(`/budgets`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error adding budget:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function updateBudget(
    id: string,
    data: SubmitBudgetFormData,
): Promise<Budget> {
    try {
        const res = await api.put(`/budgets/${id}`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updating budget:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function deleteBudget(id: string): Promise<undefined> {
    try {
        await api.delete(`/budgets/${id}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting budget:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

// Overview APIs

export async function getBudgetOverview(): Promise<BudgetOverview> {
    try {
        const res = await api.get(`/budgets/overview?page_size=5`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(
                "Error fetching budget overview:",
                error.response?.data,
            );
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function getExpenseOverview(): Promise<ExpenseOverview> {
    try {
        const res = await api.get(`/expenses/overview?page_size=5`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(
                "Error fetching expense overview:",
                error.response?.data,
            );
        }
        throw error; // Rethrow the error after logging it
    }
}

// Profile API

export async function getProfile(): Promise<Profile> {
    try {
        const res = await api.get("/auth/profile");
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching profile:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}

export async function updateProfile(data: Profile): Promise<Profile> {
    try {
        const res = await api.put("/auth/profile", data);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updating profile:", error.response?.data);
        }
        throw error; // Rethrow the error after logging it
    }
}
