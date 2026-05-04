import type {
    DefaultValues,
    FieldValues,
    Resolver,
    UseFormProps,
} from "react-hook-form";

export function defaultUseFormConfig<T extends FieldValues>(
    defaultValues: DefaultValues<T>,
    resolver: Resolver<T, unknown, T>,
): UseFormProps<T, unknown, T> {
    return {
        delayError: 1500,
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues,
        resolver,
    };
}
