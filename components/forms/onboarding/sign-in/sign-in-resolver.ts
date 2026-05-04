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
} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";

const schema: ZodObject<{
    email: ZodEmail;
    password: ZodString;
}> = object({
    email: email("Please enter a valid email address"),
    password: string().min(2, "Password must be at least 2 characters long"),
});

export const signInResolver: Resolver<
    { email: string; password: string },
    unknown,
    { email: string; password: string }
> = zodResolver<input<typeof schema>, unknown, output<typeof schema>>(schema);

export type SignInFormData = zodInfer<typeof schema>;
