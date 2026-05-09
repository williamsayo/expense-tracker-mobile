import {
    string,
    type ZodObject,
    ZodString,
    object,
    type output,
    type input,
    type infer as zodInfer,
    email,
    ZodEmail,
} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";

const schema: ZodObject<{
    username: ZodString;
    email: ZodEmail;
    firstName: ZodString;
    lastName: ZodString;
}> = object({
    username: string()
        .min(2, "Username must be at least 2 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores",
        ),
    email: email().nonempty("Email is required"),
    firstName: string().min(2, "First name must be at least 2 characters"),
    lastName: string().min(2, "Last name must be at least 2 characters"),
});

export const profileResolver: Resolver<
    {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
    },
    unknown,
    {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
    }
> = zodResolver<input<typeof schema>, unknown, output<typeof schema>>(schema);

export type SubmitProfileFormData = zodInfer<typeof schema>;
