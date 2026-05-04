import {
    string,
    type ZodObject,
    ZodString,
    object,
    type output,
    type input,
    type infer as zodInfer,
    enum as zodEnum,
    date,
    number,
    type ZodEnum,
    ZodDate,
    ZodNumber,
    ZodOptional,
    ZodNullable,
    ZodTransform,
    ZodPipe,
} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";
import { Category, Currency } from "../budget/types";

const schema: ZodObject<{
    name: ZodOptional<ZodString>;
    category: ZodEnum<{
        food: "food";
        health: "health";
        rent: "rent";
        utilities: "utilities";
        transport: "transport";
        entertainment: "entertainment";
        other: "other";
    }>;
    currency: ZodOptional<
        ZodEnum<{
            USD: "USD";
            EUR: "EUR";
            GBP: "GBP";
            NGN: "NGN";
            GHS: "GHS";
        }>
    >;
    amount: ZodPipe<ZodString, ZodTransform<string, string>>;
    note: ZodOptional<ZodString>;
    date: ZodNullable<ZodDate>;
}> = object({
    name: string().min(2, "Name must be at least 2 characters").optional(),
    amount: string()
        .nonempty("Amount is required")
        .regex(/^\d+([.,]\d+)?$/, "Amount must be a valid number")
        .refine((val) => {
            const normalized = val.replace(",", ".");
            return !isNaN(parseFloat(normalized));
        }, "Amount must be a valid number")
        .transform((val) => val.replace(",", ".")),
    date: date().max(new Date(), "Date cannot be in the future").nullable(),
    category: zodEnum(Category, {
        message: "Invalid category",
    }),
    currency: zodEnum(Currency, {
        message: "Invalid currency",
    }).optional(),
    note: string()
        .max(500, "Note must be at most 500 characters long")
        .optional(),
});

export const expenseResolver: Resolver<
    {
        name?: string;
        amount: string;
        category: Category;
        currency?: Currency;
        date: Date | null;
        note?: string;
    },
    unknown,
    {
        name?: string;
        amount: string;
        category: Category;
        currency?: Currency;
        date: Date | null;
        note?: string;
    }
> = zodResolver<input<typeof schema>, unknown, output<typeof schema>>(schema);

export type SubmitExpenseFormData = zodInfer<typeof schema>;
