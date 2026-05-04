import { ThemedButton } from "@/components/themed/Button";
import { ThemedTextInput } from "@/components/themed/Input/Text";
import { ThemedView } from "@/components/themed/View";
import { useAuth } from "@/context/auth";
import { Link } from "expo-router";
import { SignInFormData, signInResolver } from "./sign-in-resolver";
import { useController, useForm } from "react-hook-form";
import { CaptionText } from "@/components/themed/Text";

export function SignInForm() {
    const { authenticate } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SignInFormData>({
        resolver: signInResolver,
        mode: "onTouched",
        reValidateMode: "onChange",
        delayError: 1500,
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        field: { onBlur: onEmailBlur, onChange: setEmail, value: email },
    } = useController({
        control,
        name: "email",
    });

    const {
        field: {
            onBlur: onPasswordBlur,
            onChange: setPassword,
            value: password,
        },
    } = useController({
        control,
        name: "password",
    });

    const handleSignIn = handleSubmit(async (data: SignInFormData) => {
        await authenticate(data.email, data.password);
    });

    return (
        <ThemedView
            shadow="raised"
            rounded="xl"
            borderColor="muted"
            bgColor="default"
            pb={6}
            pi={4}
            gap={4}
            alignItems="center"
        >
            <ThemedView gap={2} width="100%">
                <ThemedTextInput
                    autoComplete="email"
                    placeholder="Email"
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={onEmailBlur}
                    error={errors.email?.message}
                    inputMode="email"
                />
                <ThemedTextInput
                    autoComplete="password"
                    placeholder="Password"
                    label="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onBlur={onPasswordBlur}
                    error={errors.password?.message}
                />
                <ThemedButton
                    // interactiveState={isDirty ? "disabled" : "pressed"}
                    isLoading={isSubmitting}
                    onPress={handleSignIn}
                >
                    {isSubmitting ? "Submitting" : "Sign in"}
                </ThemedButton>
            </ThemedView>

            <Link href="/(auth)/sign-up" asChild>
                <ThemedButton
                    accessibilityRole="link"
                    variant="text"
                    textProps={{ color: "link" }}
                >
                    <CaptionText color="link">
                        Don't have an account? Sign up
                    </CaptionText>
                </ThemedButton>
            </Link>
        </ThemedView>
    );
}
