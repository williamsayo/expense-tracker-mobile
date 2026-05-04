import { DateInputWithPicker } from "@/components/forms/DateInput";
import { ThemedButton } from "@/components/themed/Button";
import { ThemedTextInput } from "@/components/themed/Input/Text";
import { ThemedView } from "@/components/themed/View";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ComponentRef, useCallback, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { expenseResolver, SubmitExpenseFormData } from "./expense-resolver";
import { defaultUseFormConfig } from "@/lib/utils/form";
import { CategoryLabels, CurrencyLabels } from "../budget/types";
import { ThemedDropdown } from "@/components/themed/Dropdown";
import {
    KeyboardAwareScrollView,
    KeyboardToolbar,
} from "react-native-keyboard-controller";
import { useCreateExpense } from "@/hooks/useExpense";
import { useRouter } from "expo-router";

export function ExpenseForm() {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dateRef = useRef<ComponentRef<typeof ThemedTextInput>>(null);
    const router = useRouter();
    const mutation = useCreateExpense();
    const {
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SubmitExpenseFormData>(
        defaultUseFormConfig(
            {
                amount: "",
                category: "food",
                currency: "EUR",
                date: null,
                note: "",
            },
            expenseResolver,
        ),
    );

    const {
        field: { onBlur: onNameBlur, onChange: setName, value: name },
    } = useController({
        control,
        name: "name",
    });

    const {
        field: { onBlur: onAmountBlur, onChange: setAmount, value: amount },
    } = useController({
        control,
        name: "amount",
    });

    const {
        field: { onBlur: onDateBlur, onChange: setDate, value: date },
    } = useController({
        control,
        name: "date",
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
            onBlur: onCategoryBlur,
            onChange: setCategory,
            value: category,
        },
    } = useController({
        control,
        name: "category",
    });

    const {
        field: { onBlur: onNoteBlur, onChange: setNote, value: note },
    } = useController({
        control,
        name: "note",
    });

    const handleCloseDatePicker = useCallback(() => {
        setShowDatePicker(false);
        setTimeout(() => {
            dateRef.current?.focus();
        }, 0);
    }, []);

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        if (event.type === "set" && selectedDate) {
            setDate(selectedDate);
        }
    };

    const onSubmit = handleSubmit(async (data: SubmitExpenseFormData) => {
        console.log("Submitting expense with data:", data.amount);
        mutation.mutate(data, {
            onSuccess: () => {
                router.push("/(app)/expense");
            },
        });
    });

    return (
        <>
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                bounces={false}
                bottomOffset={62}
            > */}
            <ThemedView gap={1}>
                <ThemedTextInput
                    label="Expense name (optional)"
                    placeholder="Enter expense name"
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
                />
                <ThemedTextInput
                    label="Expense Amount"
                    placeholder="Enter expense amount"
                    inputMode="decimal"
                    value={amount}
                    onChangeText={setAmount}
                    onBlur={onAmountBlur}
                    error={errors.amount?.message}
                />
                <ThemedDropdown
                    data={CategoryLabels}
                    onBlur={onCategoryBlur}
                    error={errors.category?.message}
                    value={category}
                    onChange={setCategory}
                    label="Expense Category Name"
                    placeholder="Enter expense category name"
                />
                <DateInputWithPicker
                    showPicker={showDatePicker}
                    date={date}
                    inputRef={dateRef}
                    onClosePicker={handleCloseDatePicker}
                    onDateChange={handleDateChange}
                    onShowPicker={handleShowDatePicker}
                    placeholder="Select date"
                    label="Date"
                    error={errors.date?.message}
                    onBlur={onDateBlur}
                    maximumDate={new Date()}
                    minimumDate={undefined}
                />
                <ThemedTextInput
                    label="Additional Notes (optional)"
                    placeholder="Enter additional notes"
                    multiline
                    textAlignVertical="top"
                    value={note}
                    onChangeText={setNote}
                    onBlur={onNoteBlur}
                    error={errors.note?.message}
                />
            </ThemedView>
            <ThemedButton
                // interactiveState={isDirty ? "disabled" : "pressed"}
                isLoading={isSubmitting}
                onPress={onSubmit}
            >
                {isSubmitting ? "Submiting" : "Create Expense"}
            </ThemedButton>
            {/* </KeyboardAwareScrollView> */}
            {/* <KeyboardToolbar /> */}
        </>
    );
}
