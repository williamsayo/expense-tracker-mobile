import { ThemedButton } from "@/components/themed/Button";
import {
    BodyText,
    CaptionText,
    LabelText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/auth";
import { useProfile } from "@/hooks/useProfile";
import { Spacing } from "@/lib/spacing/spacing";
import { elevations, mixins } from "@/lib/tokens";
import { formatDate } from "@/lib/utils/formatter";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { ColorSchemeName } from "react-native";

export function Profile() {
    const { isLoading, data: profile, error } = useProfile();
    const { logout } = useAuth();
    const [theme, setTheme] = useState<NonNullable<ColorSchemeName>>("light");

    const getThemeButtonProps = useCallback(
        (btnTheme: ColorSchemeName) => {
            const commonProps = {
                size: "icon" as const,
            };

            if (theme === btnTheme) {
                return {
                    ...commonProps,

                    style: {
                        ...elevations.raised,
                    },
                };
            }

            return {
                ...commonProps,
                colorScheme: "subtle" as const,
                variant: "outline" as const,
            };
        },
        [theme],
    );

    if (isLoading) {
        return (
            <ThemedView flex={1} justifyContent="center" alignItems="center">
                <Spinner color="mutedBorder" />
            </ThemedView>
        );
    }

    return (
        <ThemedView mb={2} pi={6} gap={8}>
            <ThemedView gap={6}>
                <ThemedView
                    borderWidth={1}
                    borderColor="muted"
                    rounded="md"
                    p={4}
                    gap={2}
                    alignItems="center"
                >
                    <ThemedView bgColor="subtle" rounded="full" p={4}>
                        <Icon
                            name="person-outline"
                            size={40}
                            color="invertedBackground"
                        />
                    </ThemedView>
                    <ThemedView alignItems="center">
                        <BodyText weight="bold">
                            {profile?.firstName} {profile?.lastName}
                        </BodyText>
                        <BodyText color="muted">{profile?.email}</BodyText>
                    </ThemedView>
                    <Link href="/(create)/personal-information" asChild>
                        <ThemedButton
                            colorScheme="primary"
                            style={{
                                paddingInline: Spacing[10],
                                paddingBlock: Spacing[2],
                                minHeight: "auto",
                            }}
                        >
                            Edit Profile
                        </ThemedButton>
                    </Link>
                </ThemedView>
                <ThemedView gap={2}>
                    <SubheaderText>Account</SubheaderText>
                    <ThemedView
                        borderWidth={1}
                        borderColor="muted"
                        rounded="xl"
                        p={4}
                        gap={2}
                    >
                        <ThemedView
                            {...mixins.between}
                            borderBottomWidth={1}
                            borderColor="muted"
                            pb={2}
                            gap={3}
                        >
                            <LabelText transform="capitalize">
                                full name
                            </LabelText>
                            <BodyText size="base" weight="medium">
                                {profile?.firstName} {profile?.lastName}
                            </BodyText>
                        </ThemedView>
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            gap={3}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <LabelText transform="capitalize">
                                username
                            </LabelText>
                            <BodyText size="base" weight="medium">
                                {profile?.username}
                            </BodyText>
                        </ThemedView>
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            gap={3}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <LabelText transform="capitalize">email</LabelText>
                            <BodyText size="base" weight="medium">
                                {profile?.email}
                            </BodyText>
                        </ThemedView>
                        <ThemedView {...mixins.between} pbs={2} gap={3}>
                            <LabelText transform="capitalize">
                                member since
                            </LabelText>
                            <BodyText size="base" weight="medium">
                                { profile && formatDate(profile?.createdAt, "medium")}
                            </BodyText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView gap={2}>
                    <SubheaderText>Preferences</SubheaderText>
                    <ThemedView
                        borderWidth={1}
                        borderColor="muted"
                        rounded="xl"
                        p={4}
                        gap={2}
                    >
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="cash-outline" />
                                <LabelText transform="capitalize">
                                    currency
                                </LabelText>
                            </ThemedView>
                            <BodyText
                                size="sm"
                                weight="medium"
                                transform="uppercase"
                            >
                                eur (€)
                            </BodyText>
                        </ThemedView>
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="moon-sharp" />
                                <LabelText transform="capitalize">
                                    appearance
                                </LabelText>
                            </ThemedView>
                            <ThemedView
                                {...mixins.row}
                                gap={1}
                                bgColor="muted"
                                rounded="md"
                                p={0.5}
                            >
                                <ThemedButton
                                    {...getThemeButtonProps("light")}
                                    onPress={() => setTheme("light")}
                                >
                                    <Icon
                                        name="sunny-outline"
                                        color="text"
                                        size={18}
                                    />
                                </ThemedButton>
                                <ThemedButton
                                    {...getThemeButtonProps("dark")}
                                    onPress={() => setTheme("dark")}
                                >
                                    <Icon
                                        name="moon-outline"
                                        color="text"
                                        size={18}
                                    />
                                </ThemedButton>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView gap={2}>
                    <SubheaderText>History</SubheaderText>
                    <ThemedView
                        borderWidth={1}
                        borderColor="muted"
                        rounded="xl"
                        p={4}
                        gap={2}
                    >
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="wallet-sharp" />
                                <LabelText transform="capitalize">
                                    total budgets
                                </LabelText>
                            </ThemedView>
                            <BodyText
                                size="sm"
                                weight="medium"
                                transform="uppercase"
                            >
                                10
                            </BodyText>
                        </ThemedView>
                        <ThemedView {...mixins.between} pbs={2}>
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="wallet-sharp" />
                                <LabelText transform="capitalize">
                                    total budgeted amount
                                </LabelText>
                            </ThemedView>
                            <BodyText
                                size="sm"
                                weight="medium"
                                transform="uppercase"
                            >
                                5000
                            </BodyText>
                        </ThemedView>
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="card-sharp" />
                                <LabelText transform="capitalize">
                                    total expense transactions
                                </LabelText>
                            </ThemedView>
                            <BodyText
                                size="sm"
                                weight="medium"
                                transform="uppercase"
                            >
                                5
                            </BodyText>
                        </ThemedView>
                        <ThemedView
                            {...mixins.between}
                            pb={2}
                            borderBottomWidth={1}
                            borderColor="muted"
                        >
                            <ThemedView {...mixins.row} gap={2}>
                                <Icon name="card-sharp" />
                                <LabelText transform="capitalize">
                                    total spent
                                </LabelText>
                            </ThemedView>
                            <BodyText
                                size="sm"
                                weight="medium"
                                transform="uppercase"
                            >
                                5000
                            </BodyText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedButton
                variant="outline"
                colorScheme="critical"
                onPress={logout}
                leftIcon={
                    <Icon name="log-out-outline" color="critical" size={20} />
                }
            >
                Logout
            </ThemedButton>
        </ThemedView>
    );
}
