import {
    BodyText,
    CaptionText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { FlatList } from "react-native";
import { mixins } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { Spacing } from "@/lib/spacing/spacing";
import { BottomTabBarHeight } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useExpenses } from "@/hooks/useExpense";
import { formatDate, formatMoney } from "@/lib/utils/formatter";
import { Spinner } from "@/components/ui/Spinner";

export function Expense() {
    const { bottom } = useSafeAreaInsets();
    const { isLoading, data: expenses, error } = useExpenses();

    if (isLoading) {
        return (
            <ThemedView flex={1} justifyContent="center" alignItems="center">
                <Spinner color="mutedBorder" />
            </ThemedView>
        );
    }

    return (
        <FlatList
            data={expenses}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={() => (
                <ThemedView height={1} bgColor="subtle" />
            )}
            ListHeaderComponent={() => (
                <ThemedView borderBottomWidth={1} borderColor="subtle" pbe={4}>
                    <SubheaderText size="2xl">All Expenses</SubheaderText>
                </ThemedView>
            )}
            ListFooterComponent={() => (
                <ThemedView height={BottomTabBarHeight - bottom} />
            )}
            contentContainerStyle={{ paddingHorizontal: Spacing[6] }}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
                <ThemedView {...mixins.row} pb={4} gap={3}>
                    <ThemedView bgColor="inverted" rounded="full" p={2}>
                        <Icon
                            name="receipt-outline"
                            size={20}
                            color="invertedText"
                        />
                    </ThemedView>
                    <ThemedView flex={1}>
                        <BodyText size="sm">{item.name}</BodyText>
                        <ThemedView {...mixins.row} gap={1} flexWrap="wrap">
                            <CaptionText color="muted" size="xs">
                                {formatDate(item.date)}
                            </CaptionText>
                            <CaptionText color="muted" size="xs">
                                •
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
            )}
        />
    );
}
