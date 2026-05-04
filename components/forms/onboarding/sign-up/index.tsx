import { ThemedButton } from "@/components/themed/Button";
import { ThemedTextInput } from "@/components/themed/Input/Text";
import { CaptionText } from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { useAuth } from "@/context/auth";
import { Link } from "expo-router";
import { useController, useForm } from "react-hook-form";
import { SignUpFormData, signUpResolver } from "./sign-up-resolver";
import { defaultUseFormConfig } from "@/lib/utils/form";

export function SignUpForm() {
    const { register } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SignUpFormData>(
        defaultUseFormConfig(
            {
                firstName: undefined,
                lastName: undefined,
                username: "",
                email: "",
                password: "",
            },
            signUpResolver,
        ),
    );

    const {
        field: {
            onBlur: onFirstNameBlur,
            onChange: setFirstName,
            value: firstName,
        },
    } = useController({
        control,
        name: "firstName",
    });

    const {
        field: {
            onBlur: onLastNameBlur,
            onChange: setLastName,
            value: lastName,
        },
    } = useController({
        control,
        name: "lastName",
    });

    const {
        field: {
            onBlur: onUsernameBlur,
            onChange: setUsername,
            value: username,
        },
    } = useController({
        control,
        name: "username",
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

    const onSubmit = handleSubmit(async (data: SignUpFormData) => {
        await register(data);
    });

    return (
        <ThemedView
            shadow="raised"
            rounded="xl"
            borderColor="muted"
            bgColor="default"
            alignItems="center"
            pb={6}
            pi={4}
            gap={4}
        >
            <ThemedView gap={2} width="100%">
                <ThemedTextInput
                    autoComplete="given-name"
                    placeholder="First Name"
                    label="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    onBlur={onFirstNameBlur}
                    error={errors.firstName?.message}
                />
                <ThemedTextInput
                    autoComplete="family-name"
                    placeholder="Last Name"
                    label="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    onBlur={onLastNameBlur}
                    error={errors.lastName?.message}
                />
                <ThemedTextInput
                    autoComplete="username"
                    placeholder="Username"
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    onBlur={onUsernameBlur}
                    error={errors.username?.message}
                />
                <ThemedTextInput
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Email"
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={onEmailBlur}
                    error={errors.email?.message}
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
                    onPress={onSubmit}
                >
                    {isSubmitting ? "Submitting" : "Sign Up"}
                </ThemedButton>
            </ThemedView>

            <Link href="/(auth)/sign-in" asChild>
                <ThemedButton variant="link">
                    <CaptionText color="link">
                        Already have an account? Sign in
                    </CaptionText>
                </ThemedButton>
            </Link>
        </ThemedView>
    );
}
