import { ProgressBar } from "@/components/themed/ProgressBar";
import {
    BodyText,
    CaptionText,
    LabelText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { Icon } from "@/components/ui/Icon";
import { mixins } from "@/lib/tokens";
import { FlatList } from "react-native";
import { Spacing } from "@/lib/spacing/spacing";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import { useThemeColor } from "@/lib/theme/use-theme-color";
import { formatMoney, formatPercentage } from "@/lib/utils/formatter";
import { useBudget } from "@/hooks/useBudget";
import { ActivityIndicator } from "react-native";
import { categoryIcons } from "@/components/forms/budget/types";

export function BudgetDetail() {
    const backgroundColor = useThemeColor("background");
    const textColor = useThemeColor("text");
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { isLoading, data: budget, error } = useBudget(id);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor },
            headerTitle: budget ? budget.name : undefined,
            headerTitleStyle: {
                color: textColor,
            },
        });
    }, [navigation]);

    if (!budget) {
        return (
            <ThemedView flex={1} justifyContent="center" alignItems="center">
                <BodyText>Budget not found</BodyText>
            </ThemedView>
        );
    }

    if (isLoading) {
        return (
            <ThemedView flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" color={textColor} />
            </ThemedView>
        );
    }

    const getPercentage = (percentage: number) => {
        return formatPercentage(percentage, { showDecimals: false });
    };

    const percentageUsed = getPercentage(budget.usedPercentage);

    return (
        <FlatList
            data={budget.allocations}
            keyExtractor={({ id }) => id}
            contentContainerStyle={{
                paddingHorizontal: Spacing[6],
            }}
            ListHeaderComponent={() => (
                <ThemedView gap={4}>
                    <ThemedView
                        gap={4}
                        borderWidth={1}
                        rounded="xl"
                        p={6}
                        shadow="sm"
                        borderColor="subtle"
                        bgColor="inverted"
                    >
                        <ThemedView {...mixins.between}>
                            <SubheaderText
                                size="sm"
                                transform="capitalize"
                                color="inverted"
                            >
                                total spent
                            </SubheaderText>
                            <Icon name="cash-outline" size={20} />
                        </ThemedView>
                        <ThemedView
                            flexDirection="row"
                            alignItems="flex-end"
                            gap={1}
                        >
                            <LabelText size="2xl" color="inverted">
                                {formatMoney(budget.amountSpent)} /{" "}
                            </LabelText>
                            <LabelText size="xl" color="inverted">
                                {formatMoney(budget.totalAmount)}
                            </LabelText>
                        </ThemedView>

                        <ThemedView gap={1}>
                            <ProgressBar
                                current={budget.amountSpent}
                                total={budget.totalAmount}
                                color="successBorder"
                            />
                            <BodyText color="inverted">
                                {percentageUsed} used
                            </BodyText>
                        </ThemedView>
                    </ThemedView>
                    <SubheaderText size="xl">Allocations</SubheaderText>
                </ThemedView>
            )}
            ListHeaderComponentStyle={{ marginBottom: Spacing[2] }}
            ItemSeparatorComponent={() => <ThemedView height={Spacing[4]} />}
            renderItem={({ item }) => (
                <ThemedView
                    gap={1.5}
                    borderWidth={1}
                    rounded="lg"
                    p={4}
                    borderColor="subtle"
                >
                    <ThemedView
                        {...mixins.row}
                        gap={3}
                        borderColor="muted"
                        key={item.id}
                    >
                        <ThemedView bgColor="inverted" rounded="sm" p={2}>
                            <Icon
                                name={categoryIcons[item.category]}
                                size={20}
                                color="invertedText"
                            />
                        </ThemedView>
                        <ThemedView flex={1}>
                            <BodyText size="sm" numberOfLines={1}>
                                {item.category}
                            </BodyText>
                            <CaptionText
                                size="xs"
                                color="subtle"
                                numberOfLines={1}
                            >
                                {getPercentage(item.usedPercentage)} used
                            </CaptionText>
                        </ThemedView>

                        <CaptionText size="xs" color="default">
                            {formatMoney(item.amountSpent)} /{" "}
                            {formatMoney(item.allocatedAmount)}
                        </CaptionText>
                    </ThemedView>
                    <ProgressBar
                        current={item.amountSpent}
                        total={item.allocatedAmount}
                        color="successBorder"
                    />
                </ThemedView>
            )}
            ListFooterComponent={() => (
                <FlatList
                    data={budget.allocations}
                    bounces={false}
                    keyExtractor={({ id }) => id}
                    style={{ marginTop: Spacing[8] }}
                    contentContainerStyle={{
                        paddingHorizontal: Spacing[6],
                    }}
                    ListHeaderComponent={() => (
                        <SubheaderText size="xl">Expenses</SubheaderText>
                    )}
                    ListHeaderComponentStyle={{ marginBottom: Spacing[2] }}
                    ItemSeparatorComponent={() => (
                        <ThemedView height={Spacing[4]} />
                    )}
                    renderItem={({ item }) => (
                        <ThemedView
                            gap={1.5}
                            borderWidth={1}
                            rounded="lg"
                            p={4}
                            borderColor="subtle"
                        >
                            <ThemedView
                                {...mixins.row}
                                gap={3}
                                borderColor="muted"
                                key={item.id}
                            >
                                <ThemedView
                                    bgColor="inverted"
                                    rounded="sm"
                                    p={2}
                                >
                                    <Icon name="receipt-outline" size={20} />
                                </ThemedView>
                                <ThemedView flex={1}>
                                    <BodyText size="sm" numberOfLines={1}>
                                        {item.category}
                                    </BodyText>
                                    <CaptionText
                                        size="xs"
                                        color="subtle"
                                        numberOfLines={1}
                                    >
                                        {getPercentage(item.usedPercentage)}{" "}
                                        used
                                    </CaptionText>
                                </ThemedView>

                                <CaptionText size="xs" color="default">
                                    {formatMoney(item.amountSpent)} /{" "}
                                    {formatMoney(item.allocatedAmount)}
                                </CaptionText>
                            </ThemedView>
                            <ProgressBar
                                current={item.amountSpent}
                                total={item.allocatedAmount}
                                color="successBorder"
                            />
                        </ThemedView>
                    )}
                />
            )}
        />
    );
}
