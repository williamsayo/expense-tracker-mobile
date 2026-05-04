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
    ZodArray,
    array,
    ZodNumber,
    ZodOptional,
    ZodNullable,
    ZodTransform,
    ZodPipe,
} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";
import { Category, Currency } from "./types";
import { START_OF_CURRENT_MONTH } from "@/components/themed/DatePicker/types";

const allocationSchema: ZodObject<{
    category: ZodEnum<{
        food: "food";
        health: "health";
        rent: "rent";
        utilities: "utilities";
        transport: "transport";
        entertainment: "entertainment";
        other: "other";
    }>;
    amount: ZodPipe<ZodString, ZodTransform<string, string>>;
}> = object({
    category: zodEnum(Category, {
        message: "Invalid category",
    }),
    amount: string()
        .nonempty("Amount is required")
        .regex(
            /^(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?|\d+[.,]\d+|\d+)$/,
            "Amount must be a valid number",
        )
        .refine((val) => {
            const normalized = val.replace(",", ".");
            return !isNaN(parseFloat(normalized));
        }, "Amount must be a valid number")
        .transform((val) => val.replace(",", ".")),
});

const schema: ZodObject<{
    name: ZodString;
    currency: ZodOptional<
        ZodEnum<{
            USD: "USD";
            EUR: "EUR";
            GBP: "GBP";
            NGN: "NGN";
            GHS: "GHS";
        }>
    >;
    startDate: ZodNullable<ZodDate>;
    endDate: ZodNullable<ZodDate>;
    allocations: ZodArray<typeof allocationSchema>;
}> = object({
    name: string().min(2, "Name must be at least 2 characters"),
    currency: zodEnum(Currency, {
        message: "Invalid currency",
    }).optional(),
    startDate: date()
        .min(START_OF_CURRENT_MONTH, "Budget must be from current month")
        .nullable(),
    endDate: date().nullable(),
    allocations: array(allocationSchema).min(
        1,
        "At least one allocation is required",
    ),
})
    .refine(({ startDate }) => startDate !== null, {
        message: "Budget start date is required",
        path: ["startDate"], // Set the path of the error to the startDate field
    })
    .refine(({ endDate }) => endDate !== null, {
        message: "Budget end date is required",
        path: ["endDate"], // Set the path of the error to the endDate field
    })
    .refine(
        ({ startDate, endDate }) => {
            if (startDate && endDate) {
                return endDate > startDate;
            }
            return true; // If either date is null, we don't want to fail this validation
        },
        {
            message: "End date must be after start date",
            path: ["endDate"],
        },
    );

export const budgetResolver: Resolver<
    {
        name: string;
        currency?: Currency;
        startDate: Date | null;
        endDate: Date | null;
        allocations: { category: Category; amount: string }[];
    },
    unknown,
    {
        name: string;
        currency?: Currency;
        startDate: Date | null;
        endDate: Date | null;
        allocations: { category: Category; amount: string }[];
    }
> = zodResolver<input<typeof schema>, unknown, output<typeof schema>>(schema);

export const budgetAllocationResolver: Resolver<
    {
        category: Category;
        amount: string;
    },
    unknown,
    {
        category: Category;
        amount: string;
    }
> = zodResolver<
    input<typeof allocationSchema>,
    unknown,
    output<typeof allocationSchema>
>(allocationSchema);

export type SubmitBudgetFormData = zodInfer<typeof schema>;

export type SubmitAllocationDraftFormData = zodInfer<typeof allocationSchema>;
