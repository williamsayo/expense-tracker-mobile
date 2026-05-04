import { ThemedButton } from "@/components/themed/Button";
import {
    BodyText,
    CaptionText,
    HeadingText,
    LabelText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { Icon } from "@/components/ui/Icon";
import { mixins } from "@/lib/tokens";
import { Spacing } from "@/lib/spacing/spacing";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import { formatDate, formatMoney } from "@/lib/utils/formatter";
import { useBudgetOverview, useExpenseOverview } from "@/hooks/useOverview";

export function Dashboard() {
    const { width } = useWindowDimensions();
    const [currentPage, setCurrentPage] = useState(0);

    const {
        isLoading: isBudgetsLoading,
        data: budgetsOverview,
        error: budgetError,
    } = useBudgetOverview();
    const {
        isLoading: isExpensesLoading,
        data: expensesOverview,
        error: expenseError,
    } = useExpenseOverview();

    const cardWidth = useMemo(() => {
        const horizontalPadding = Spacing[6] * 2;
        return width - horizontalPadding;
    }, [width]);

    // if (isBudgetsLoading || isExpensesLoading) {
    //     return (
    //         <ThemedView flex={1} justifyContent="center" alignItems="center">
    //             <ActivityIndicator size="large" color="primary" />
    //         </ThemedView>
    //     );
    // }

    const activeBudget = budgetsOverview?.activeBudget;
    const recentExpenses = expensesOverview?.recentExpenses || [];
    const recentBudgets = budgetsOverview?.recentBudgets || [];

    return (
        <>
            <ThemedView gap={1}>
                <HeadingText size="xl">Expense Overview </HeadingText>
                <CaptionText color="muted">
                    Here's what's happening with your finances today.
                </CaptionText>
            </ThemedView>

            <ThemedView gap={2}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1, width: "100%" }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onMomentumScrollEnd={(event) => {
                        const nextPage = Math.round(
                            event.nativeEvent.contentOffset.x / cardWidth,
                        );

                        setCurrentPage(nextPage);
                    }}
                >
                    <ThemedView
                        width={cardWidth}
                        gap={4}
                        borderWidth={1}
                        rounded="lg"
                        p={6}
                        shadow="raised"
                        borderColor="muted"
                        bgColor="default"
                    >
                        <ThemedView
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <SubheaderText
                                size="sm"
                                transform="uppercase"
                                color="subtle"
                            >
                                total spending
                            </SubheaderText>
                            <Icon name="cash-outline" size={20} />
                        </ThemedView>
                        <LabelText size="3xl" color="primary">
                            {formatMoney(
                                expensesOverview?.totalSpent ?? 0,
                                "EUR",
                            )}
                        </LabelText>

                        <ThemedView
                            {...mixins.row}
                            justifyContent="center"
                            gap={4}
                        >
                            <Link href="/(create)/create-expense" asChild>
                                <ThemedButton>Add Expense</ThemedButton>
                            </Link>
                            <Link href="/(create)/create-budget" asChild>
                                <ThemedButton
                                    variant="outline"
                                    colorScheme="subtle"
                                >
                                    Create Budget
                                </ThemedButton>
                            </Link>
                        </ThemedView>
                    </ThemedView>

                    {activeBudget && (
                        <ThemedView
                            width={cardWidth}
                            gap={4}
                            rounded="lg"
                            p={6}
                            borderWidth={1}
                            borderColor="default"
                            bgColor="subtle"
                        >
                            <ThemedView>
                                <ThemedView {...mixins.between}>
                                    <SubheaderText
                                        transform="capitalize"
                                        color="subtle"
                                    >
                                        Active Budget
                                    </SubheaderText>
                                    <Icon name="wallet-outline" size={20} />
                                </ThemedView>
                                <BodyText transform="capitalize" size="sm">
                                    {activeBudget?.name}
                                </BodyText>
                            </ThemedView>
                            <ThemedView
                                flexDirection="row"
                                alignItems="baseline"
                                gap={1}
                            >
                                <LabelText size="2xl" color="primary">
                                    {formatMoney(
                                        activeBudget?.amountSpent ?? 0,
                                        activeBudget?.currency,
                                    )}
                                </LabelText>
                                <CaptionText color="subtle">
                                    /{" "}
                                    {formatMoney(
                                        activeBudget?.totalAmount ?? 0,
                                        activeBudget?.currency,
                                    )}
                                </CaptionText>
                            </ThemedView>
                            <Link
                                href={{
                                    pathname: "/budget/[id]",
                                    params: {
                                        id: activeBudget?.id || "",
                                    },
                                }}
                                asChild
                            >
                                <ThemedButton
                                    accessibilityRole="link"
                                    colorScheme="secondary"
                                >
                                    Manage Budget
                                </ThemedButton>
                            </Link>
                        </ThemedView>
                    )}
                </ScrollView>

                {activeBudget && (
                    <ThemedView {...mixins.row} justifyContent="center" gap={1}>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <ThemedView
                                key={index}
                                width={index === currentPage ? 16 : 8}
                                height={7}
                                rounded="full"
                                bgColor={
                                    index === currentPage ? "subtle" : "muted"
                                }
                            />
                        ))}
                    </ThemedView>
                )}
            </ThemedView>

            <ThemedView gap={2}>
                <ThemedView flexDirection="row" justifyContent="space-between">
                    <SubheaderText transform="capitalize">
                        Recent Expenses
                    </SubheaderText>
                    <Link href="/expense" asChild>
                        <ThemedButton
                            accessibilityRole="link"
                            variant="ghost"
                            size="icon"
                            style={{
                                minHeight: "auto",
                            }}
                            textProps={{
                                size: "xs",
                            }}
                            hitSlop={Spacing[2]}
                        >
                            <CaptionText size="xs" color="subtle">
                                View All
                            </CaptionText>
                        </ThemedButton>
                    </Link>
                </ThemedView>
                <ThemedView
                    borderWidth={1}
                    rounded="xl"
                    shadow="raised"
                    borderColor="muted"
                >
                    {recentExpenses.map((item, index) => (
                        <ThemedView
                            {...mixins.row}
                            pi={6}
                            pb={4}
                            gap={3}
                            borderBottomWidth={
                                recentExpenses.length - 1 === index ? 0 : 1
                            }
                            borderColor="muted"
                            key={item.id}
                        >
                            <ThemedView bgColor="inverted" rounded="full" p={2}>
                                <Icon
                                    name="receipt-outline"
                                    size={20}
                                    color="invertedText"
                                />
                            </ThemedView>
                            <ThemedView flex={1}>
                                <BodyText size="sm">{item.name}</BodyText>
                                <ThemedView
                                    {...mixins.row}
                                    gap={1}
                                    flexWrap="wrap"
                                >
                                    <CaptionText color="muted" size="xs">
                                        {formatDate(item.date)} •
                                    </CaptionText>
                                    <ThemedView
                                        bgColor="subtle"
                                        rounded="full"
                                        pi={2.5}
                                        pb={0.5}
                                    >
                                        <CaptionText color="primary" size="xs">
                                            {item.category}
                                        </CaptionText>
                                    </ThemedView>
                                </ThemedView>
                            </ThemedView>
                            <BodyText color="critical">
                                -{formatMoney(item.amount, item.currency)}
                            </BodyText>
                        </ThemedView>
                    ))}
                </ThemedView>
                {recentExpenses.length == 0 && (
                    <ThemedView minHeight={100} {...mixins.center}>
                        <LabelText>No recent expense</LabelText>
                    </ThemedView>
                )}
            </ThemedView>

            <ThemedView gap={2}>
                <ThemedView flexDirection="row" justifyContent="space-between">
                    <SubheaderText transform="capitalize">
                        Budgets Status
                    </SubheaderText>
                    <Link href="/budget" asChild>
                        <ThemedButton
                            accessibilityRole="link"
                            variant="ghost"
                            size="icon"
                            colorScheme="subtle"
                            style={{
                                minHeight: "auto",
                            }}
                            textProps={{
                                size: "xs",
                            }}
                            hitSlop={Spacing[2]}
                        >
                            View All
                        </ThemedButton>
                    </Link>
                </ThemedView>
                <ThemedView
                    borderWidth={1}
                    rounded="xl"
                    shadow="raised"
                    borderColor="muted"
                >
                    {recentBudgets.map((item, index) => (
                        <ThemedView
                            {...mixins.row}
                            pi={6}
                            pb={4}
                            gap={3}
                            borderBottomWidth={
                                recentBudgets.length - 1 === index ? 0 : 1
                            }
                            borderColor="muted"
                            key={item.id}
                        >
                            <ThemedView bgColor="inverted" rounded="full" p={2}>
                                <Icon
                                    name="wallet-outline"
                                    size={20}
                                    color="invertedText"
                                />
                            </ThemedView>
                            <ThemedView flex={1}>
                                <BodyText size="sm" numberOfLines={1}>
                                    {item.name}
                                </BodyText>
                                <ThemedView
                                    {...mixins.row}
                                    gap={1}
                                    flexWrap="wrap"
                                >
                                    <CaptionText
                                        color="muted"
                                        size="xs"
                                        numberOfLines={1}
                                    >
                                        {formatDate(item.startDate)} -{" "}
                                        {formatDate(item.endDate)}
                                    </CaptionText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedView>
                                <CaptionText size="xs" color="default">
                                    {formatMoney(
                                        item.amountSpent,
                                        item.currency,
                                        {
                                            showDecimals: false,
                                        },
                                    )}{" "}
                                    /{" "}
                                    {formatMoney(
                                        item.totalAmount,
                                        item.currency,
                                        {
                                            showDecimals: false,
                                        },
                                    )}
                                </CaptionText>
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>
                {recentBudgets.length == 0 && (
                    <ThemedView minHeight={100} {...mixins.center}>
                        <LabelText>No recent budget</LabelText>
                    </ThemedView>
                )}
            </ThemedView>
        </>
    );
}
