import { ThemedButton } from "@/components/themed/Button";
import {
    BodyText,
    CaptionText,
    HeadingText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { Icon } from "@/components/ui/Icon";
import { mixins } from "@/lib/tokens";
import { Spacing } from "@/lib/spacing/spacing";
import { Link } from "expo-router";
import { Alert, FlatList } from "react-native";
import { ProgressBar } from "@/components/themed/ProgressBar";
import { BottomTabBarHeight } from "@/constants";
import { formatMoney } from "@/lib/utils/formatter";
import { useBudgets } from "@/hooks/useBudget";
import { Spinner } from "@/components/ui/Spinner";

export function Budget() {
    const { isLoading, data: budgets, error } = useBudgets();

    if (isLoading) {
        return (
            <ThemedView flex={1} justifyContent="center" alignItems="center">
                <Spinner color="mutedBorder" />
            </ThemedView>
        );
    }

    if (error) {
        Alert.alert("Error", "Failed to load budgets. Please try again later.");
    }

    return (
        <>
            <ThemedView pi={6}>
                <HeadingText transform="capitalize">my budgets</HeadingText>
            </ThemedView>
            <FlatList
                data={budgets}
                bounces={false}
                ItemSeparatorComponent={() => <ThemedView height={5} />}
                keyExtractor={({ id }) => id}
                style={{
                    width: "100%",
                }}
                ListFooterComponent={() => (
                    <ThemedView height={BottomTabBarHeight - Spacing[6]} />
                )}
                contentContainerStyle={{
                    gap: Spacing[6],
                    paddingHorizontal: Spacing[6],
                }}
                renderItem={({ item: budget }) => (
                    <Link
                        href={{
                            pathname: "/budget/[id]",
                            params: { id: budget.id },
                        }}
                        asChild
                    >
                        <ThemedButton
                            variant="text"
                            rounded="none"
                            style={{
                                minHeight: "auto",
                                paddingBlock: 0,
                                paddingInline: 0,
                            }}
                        >
                            <ThemedView width="100%">
                                <ThemedView
                                    gap={4}
                                    borderWidth={1}
                                    rounded="lg"
                                    p={6}
                                    shadow="raised"
                                    borderColor="subtle"
                                    bgColor="default"
                                >
                                    <ThemedView
                                        flexDirection="row"
                                        justifyContent="space-between"
                                    >
                                        <SubheaderText
                                            size="sm"
                                            transform="uppercase"
                                        >
                                            {budget.name}
                                        </SubheaderText>
                                        <BodyText size="sm" color="subtle">
                                            {budget.currency}
                                        </BodyText>
                                    </ThemedView>
                                    <ThemedView {...mixins.row} gap={1}>
                                        <Icon
                                            name="calendar-outline"
                                            size={16}
                                        />
                                        <CaptionText
                                            color="muted"
                                            size="xs"
                                            numberOfLines={1}
                                        >
                                            {new Date(
                                                budget.startDate,
                                            ).toLocaleDateString()}
                                            -
                                            {new Date(
                                                budget.endDate,
                                            ).toLocaleDateString()}
                                        </CaptionText>
                                    </ThemedView>
                                    <ThemedView gap={1}>
                                        <BodyText color="subtle">
                                            {formatMoney(
                                                budget.amountSpent,
                                                budget.currency,
                                            )}{" "}
                                            /{" "}
                                            {formatMoney(
                                                budget.totalAmount,
                                                budget.currency,
                                            )}
                                        </BodyText>
                                        <ProgressBar
                                            current={budget.amountSpent}
                                            total={budget.totalAmount}
                                            color={
                                                budget.amountSpent <
                                                budget.totalAmount
                                                    ? "successBorder"
                                                    : "critical"
                                            }
                                        />
                                    </ThemedView>
                                    <BodyText size="xs" color="subtle">
                                        {budget.allocations.length} Categories
                                    </BodyText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedButton>
                    </Link>
                )}
                ListEmptyComponent={() => (
                    <ThemedView flex={1} minHeight={100} {...mixins.center}>
                        <SubheaderText>No Budget available</SubheaderText>
                    </ThemedView>
                )}
            />
        </>
    );
}
