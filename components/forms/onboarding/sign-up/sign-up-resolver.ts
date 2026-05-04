import {
    string,
    email,
    type ZodObject,
    ZodString,
    object,
    type output,
    type input,
    type infer as zodInfer,
    ZodEmail,
    ZodOptional,
} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";

const schema: ZodObject<{
    firstName: ZodOptional<ZodString>;
    lastName: ZodOptional<ZodString>;
    username: ZodString;
    email: ZodEmail;
    password: ZodString;
}> = object({
    firstName: string().min(2, "First name must be at least 2 characters long").optional(),
    lastName: string().min(2, "Last name must be at least 2 characters long").optional(),
    username: string().min(2, "Username must be at least 2 characters long"),
    email: email("Please enter a valid email address"),
    password: string().min(2, "Password must be at least 2 characters long"),
});

export const signUpResolver: Resolver<
    {
        firstName?: string;
        lastName?: string;
        username: string;
        email: string;
        password: string;
    },
    unknown,
    {
        firstName?: string;
        lastName?: string;
        username: string;
        email: string;
        password: string;
    }
> = zodResolver<input<typeof schema>, unknown, output<typeof schema>>(schema);

export type SignUpFormData = zodInfer<typeof schema>;
