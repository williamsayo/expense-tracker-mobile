import { DateInputWithPicker } from "@/components/forms/DateInput";
import { ThemedButton } from "@/components/themed/Button";
import { ThemedTextInput } from "@/components/themed/Input/Text";
import {
    CaptionText,
    LabelText,
    SubheaderText,
} from "@/components/themed/Text";
import { ThemedView } from "@/components/themed/View";
import { Icon } from "@/components/ui/Icon";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ComponentRef, useCallback, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";
import {
    budgetAllocationResolver,
    budgetResolver,
    SubmitAllocationDraftFormData,
    SubmitBudgetFormData,
} from "./budget-resolver";
import { defaultUseFormConfig } from "@/lib/utils/form";
import { ThemedDropdown } from "@/components/themed/Dropdown";
import { categoryIcons, CategoryLabels, CurrencyLabels } from "./types";
import { FlatList } from "react-native";
import {
    KeyboardAwareScrollView,
    KeyboardToolbar,
} from "react-native-keyboard-controller";
import { mixins } from "@/lib/tokens";
import { formatMoney } from "@/lib/utils/formatter";
import { useCreateBudget } from "@/hooks/useBudget";
import { useRouter } from "expo-router";
import { START_OF_CURRENT_MONTH } from "@/components/themed/DatePicker/types";

export function BudgetForm() {
    const [showDatePicker, setShowDatePicker] = useState({
        start: false,
        end: false,
    });
    const router = useRouter();

    const mutation = useCreateBudget();

    const {
        handleSubmit: submitDraft,
        control: allocationControl,
        reset,
        formState: {
            isDirty: draftDirty,
            isSubmitting: isSubmittingDraft,
            errors: allocationError,
        },
    } = useForm<SubmitAllocationDraftFormData>(
        defaultUseFormConfig(
            {
                amount: "",
                category: "food",
            },
            budgetAllocationResolver,
        ),
    );

    const {
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SubmitBudgetFormData>(
        defaultUseFormConfig(
            {
                allocations: [],
                currency: "EUR",
                startDate: null,
                endDate: null,
                name: "",
            },
            budgetResolver,
        ),
    );

    const startDateRef = useRef<ComponentRef<typeof ThemedTextInput>>(null);
    const endDateRef = useRef<ComponentRef<typeof ThemedTextInput>>(null);

    const {
        field: { onBlur: onNameBlur, onChange: setName, value: name },
    } = useController({
        control,
        name: "name",
    });

    const {
        field: {
            onBlur: onCurrencyBlur,
            onChange: setCurrency,
            value: currency,
        },
    } = useController({
        control,
        name: "currency",
    });

    const {
        field: {
            onBlur: onStartDateBlur,
            onChange: setStartDate,
            value: startDate,
        },
    } = useController({
        control,
        name: "startDate",
    });

    const {
        field: { onBlur: onEndDateBlur, onChange: setEndDate, value: endDate },
    } = useController({
        control,
        name: "endDate",
    });

    const {
        field: {
            onBlur: onAllocationBlur,
            onChange: setAllocation,
            value: allocations,
        },
    } = useController({
        control,
        name: "allocations",
    });

    const {
        field: {
            onBlur: onCategoryBlur,
            onChange: setCategory,
            value: category,
        },
    } = useController({
        control: allocationControl,
        name: "category",
    });

    const {
        field: { onBlur: onAmountBlur, onChange: setAmount, value: amount },
    } = useController({
        control: allocationControl,
        name: "amount",
    });

    const handleCloseStartDatePicker = useCallback(() => {
        setShowDatePicker((prevState) => ({
            ...prevState,
            start: false,
        }));
        setTimeout(() => {
            startDateRef.current?.focus();
        }, 0);
    }, []);

    const handleCloseEndDatePicker = useCallback(() => {
        setShowDatePicker((prevState) => ({
            ...prevState,
            end: false,
        }));
        setTimeout(() => {
            endDateRef.current?.focus();
        }, 0);
    }, []);

    const handleShowStartDatePicker = () => {
        setShowDatePicker({
            end: false,
            start: true,
        });
    };

    const handleShowEndDatePicker = () => {
        setShowDatePicker({
            start: false,
            end: true,
        });
    };

    const handleStartDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        if (event.type === "set" && selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const handleEndDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        if (event.type === "set" && selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const addAllocation = submitDraft((draft) => {
        const filteredAllocations = allocations.filter(
            (allocation) => allocation.category !== draft.category,
        );

        setAllocation([
            ...filteredAllocations,
            {
                ...draft,
            },
        ]);
        reset();
    });

    const removeAllocation = (id: number) => {
        const updated_allocations = allocations.filter(
            (_, index) => index !== id,
        );
        setAllocation(updated_allocations);
    };

    const totalBudget = allocations.reduce(
        (total, allocation) =>
            total + parseFloat(allocation.amount.replace(/,/g, ".")),
        0,
    );

    const onSubmit = handleSubmit(async (data: SubmitBudgetFormData) => {
        console.log("Submitting budget with data:", data);
        mutation.mutate(data, {
            onSuccess: () => {
                router.push("/(app)/budget");
            },
        });
    });

    return (
        // wrap in keyboard aware scroll view to prevent keyboard from covering inputs
        <>
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                bounces={false}
                bottomOffset={62}
            > */}
                <ThemedView
                    shadow="raised"
                    rounded="xl"
                    borderWidth={1}
                    borderColor="muted"
                    bgColor="default"
                    p={4}
                    gap={4}
                >
                    <SubheaderText>Budget Fundamentals</SubheaderText>
                    <ThemedView gap={1}>
                        <ThemedTextInput
                            hideLabel
                            label="Budget name"
                            placeholder="Enter budget name"
                            value={name}
                            onChangeText={setName}
                            onBlur={onNameBlur}
                            error={errors.name?.message}
                        />
                        <ThemedDropdown
                            data={CurrencyLabels}
                            value={currency}
                            onChange={setCurrency}
                            onBlur={onCurrencyBlur}
                            error={errors.currency?.message}
                            label="Currency"
                            placeholder="Select currency"
                            hideLabel
                        />
                        <DateInputWithPicker
                            showPicker={showDatePicker.start}
                            date={startDate}
                            inputRef={startDateRef}
                            onBlur={onStartDateBlur}
                            onClosePicker={handleCloseStartDatePicker}
                            onDateChange={handleStartDateChange}
                            onShowPicker={handleShowStartDatePicker}
                            placeholder="Select start date"
                            label="Start Date"
                            error={errors.startDate?.message}
                            minimumDate={START_OF_CURRENT_MONTH}
                        />
                        <DateInputWithPicker
                            showPicker={showDatePicker.end}
                            date={endDate}
                            inputRef={endDateRef}
                            onBlur={onEndDateBlur}
                            onClosePicker={handleCloseEndDatePicker}
                            onDateChange={handleEndDateChange}
                            onShowPicker={handleShowEndDatePicker}
                            placeholder="Select end date"
                            label="End Date"
                            error={errors.endDate?.message}
                            minimumDate={START_OF_CURRENT_MONTH}
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView
                    gap={4}
                    shadow="raised"
                    rounded="xl"
                    borderWidth={1}
                    borderColor="muted"
                    bgColor="default"
                    p={4}
                >
                    <SubheaderText>Categories</SubheaderText>
                    <ThemedView>
                        <ThemedDropdown
                            data={CategoryLabels}
                            value={category}
                            onChange={setCategory}
                            onBlur={onCategoryBlur}
                            label="Category Name"
                            placeholder="Enter category name"
                            error={allocationError.category?.message}
                            hideLabel
                        />
                        <ThemedView
                            flexDirection="row"
                            gap={4}
                            width="100%"
                            alignItems="flex-start"
                        >
                            <ThemedTextInput
                                hideLabel
                                label="Amount"
                                placeholder="Enter amount"
                                containerProps={{
                                    style: { flexShrink: 1, width: "80%" },
                                }}
                                inputMode="decimal"
                                value={amount}
                                onChangeText={setAmount}
                                onBlur={onAmountBlur}
                                error={
                                    allocationError.amount?.message ||
                                    errors.allocations?.message
                                }
                            />
                            <ThemedButton
                                leftIcon={
                                    <Icon
                                        name="add"
                                        size={24}
                                        color="invertedText"
                                    />
                                }
                                size="sm"
                                variant="solid"
                                colorScheme="primary"
                                onPress={addAllocation}
                            >
                                Add
                            </ThemedButton>
                        </ThemedView>
                        {allocations.length > 0 && (
                            <>
                                <FlatList
                                    data={allocations}
                                    keyExtractor={(_, index) =>
                                        index.toString()
                                    }
                                    renderItem={({ item, index }) => (
                                        <ThemedView
                                            {...mixins.row}
                                            justifyContent="space-between"
                                            pi={1}
                                            pb={2}
                                        >
                                            <ThemedView {...mixins.row} gap={4}>
                                                <ThemedView
                                                    bgColor="inverted"
                                                    rounded="full"
                                                    p={2}
                                                >
                                                    <Icon
                                                        name={
                                                            categoryIcons[
                                                                item.category
                                                            ]
                                                        }
                                                        size={20}
                                                        color="invertedText"
                                                    />
                                                </ThemedView>
                                                <ThemedView>
                                                    <LabelText weight="bold">
                                                        {item.category.toLowerCase()}
                                                    </LabelText>
                                                    <CaptionText>
                                                        {formatMoney(
                                                            item.amount,
                                                            currency,
                                                        )}
                                                    </CaptionText>
                                                </ThemedView>
                                            </ThemedView>
                                            <ThemedButton
                                                size="icon"
                                                variant="text"
                                                onPress={() =>
                                                    removeAllocation(index)
                                                }
                                            >
                                                <Icon
                                                    name="close-outline"
                                                    size={24}
                                                    color="critical"
                                                />
                                            </ThemedButton>
                                        </ThemedView>
                                    )}
                                />
                                <ThemedView
                                    borderTopWidth={1}
                                    borderColor="subtle"
                                    pi={1}
                                    mbs={2}
                                    pbs={3}
                                    {...mixins.row}
                                    justifyContent="space-between"
                                >
                                    <SubheaderText>Total Budget</SubheaderText>
                                    <LabelText>
                                        {formatMoney(totalBudget, currency)}
                                    </LabelText>
                                </ThemedView>
                            </>
                        )}
                    </ThemedView>
                </ThemedView>
                {/* a list to display budget allocations */}
                {/* <FlatList> */}
                {/* render budget allocations here */}
                {/* </FlatList> */}
                <ThemedButton
                    // interactiveState={isDirty ? "disabled" : "pressed"}
                    isLoading={isSubmitting}
                    onPress={onSubmit}
                >
                    {isSubmitting ? "Submitting" : "Create Budget"}
                </ThemedButton>
            {/* </KeyboardAwareScrollView>
            <KeyboardToolbar /> */}
        </>
    );
}
