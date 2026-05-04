import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

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

export const categoryIcons: Record<
    Category,
    ComponentProps<typeof Ionicons>["name"]
> = {
    food: "restaurant-outline",
    health: "medkit-outline",
    rent: "home-outline",
    utilities: "bulb-outline",
    transport: "car-outline",
    entertainment: "film-outline",
    other: "ellipsis-horizontal-outline",
} as const;

export const CategoryLabels = Category.map((category) => ({
    label: category.charAt(0) + category.slice(1).toLowerCase(),
    value: category,
}));

export const CurrencyLabels = Currency.map((currency) => ({
    label: currency,
    value: currency,
}));

export type Category = (typeof Category)[number];

export type Currency = (typeof Currency)[number];
