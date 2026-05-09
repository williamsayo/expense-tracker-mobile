import { ThemedTextInput } from "@/components/themed/Input/Text";
import { HeadingText, SubheaderText } from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { defaultUseFormConfig } from "@/lib/utils/form";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { profileResolver, SubmitProfileFormData } from "./profile-resolver";
import { Link, useRouter } from "expo-router";
import { mixins, typography } from "@/lib/tokens";
import { ThemedButton } from "@/components/themed/Button";

export function ProfileForm() {
    const router = useRouter();
    const { isLoading, data: profileData, error } = useProfile();
    const mutation = useUpdateProfile();
    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SubmitProfileFormData>(
        defaultUseFormConfig(
            {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
            },
            profileResolver,
        ),
    );

    useEffect(() => {
        if (!profileData) {
            return;
        }

        reset({
            username: profileData.username ?? "",
            email: profileData.email ?? "",
            firstName: profileData.firstName ?? "",
            lastName: profileData.lastName ?? "",
        });
    }, [profileData, reset]);

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

    const onSubmit = handleSubmit(async (data: SubmitProfileFormData) => {
        console.log("Submitting profile with data:", data);
        mutation.mutate(data, {
            onSuccess: () => {
                router.push("/(app)/profile");
            },
        });
    });

    return (
        <ThemedView
            borderColor="muted"
            rounded="md"
            shadow="raised"
            borderWidth={1}
            p={4}
            gap={4}
        >
            <ThemedView
                borderBottomWidth={1}
                borderColor="muted"
                pb={3}
                gap={2}
                mbe={4}
            >
                <HeadingText {...typography.headings.h4}>
                    Personal Information
                </HeadingText>
                <SubheaderText size="sm" color="subtle">
                    Manage your account identity and contact details.
                </SubheaderText>
            </ThemedView>
            <ThemedView gap={2}>
                <ThemedTextInput
                    label="First name"
                    placeholder="Enter first name"
                    value={firstName}
                    onChangeText={setFirstName}
                    onBlur={onFirstNameBlur}
                    error={errors.firstName?.message}
                />
                <ThemedTextInput
                    label="Last name"
                    placeholder="Enter last name"
                    value={lastName}
                    onChangeText={setLastName}
                    onBlur={onLastNameBlur}
                    error={errors.lastName?.message}
                />
                <ThemedTextInput
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChangeText={setUsername}
                    onBlur={onUsernameBlur}
                    error={errors.username?.message}
                />
                <ThemedTextInput
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={onEmailBlur}
                    error={errors.email?.message}
                />
            </ThemedView>
            <ThemedView {...mixins.row} gap={2} >
                <Link href="/(app)/profile" asChild>
                    <ThemedButton fullWidth variant="outline" disabled={isSubmitting}>Cancel</ThemedButton>
                </Link>
                <ThemedButton fullWidth onPress={onSubmit} disabled={isSubmitting}>
                    Save Changes
                </ThemedButton>
            </ThemedView>
        </ThemedView>
    );
}
