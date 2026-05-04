import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ThemedTextInput } from "../themed/Input/Text";
import { ComponentRef, RefObject } from "react";
import { Icon } from "../ui/Icon";
import { formatDate } from "@/lib/utils/formatter";
import { ThemedDatePicker } from "../themed/DatePicker/index.ios";

export interface DateInputWithPicker extends Omit<
    ThemedTextInput,
    "value" | "onChange"
> {
    date: Date | null;
    showPicker: boolean;
    onShowPicker: () => void;
    onClosePicker: () => void;
    onDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
    inputRef: RefObject<ComponentRef<typeof ThemedTextInput> | null>;
    maximumDate?: Date;
    minimumDate?: Date;
}

export function DateInputWithPicker({
    hideLabel = true,
    maximumDate,
    minimumDate,
    label,
    placeholder = "Select date",
    date,
    showPicker,
    onShowPicker,
    onClosePicker,
    onDateChange,
    inputRef,
    ...inputProps
}: DateInputWithPicker) {
    return (
        <>
            <ThemedTextInput
                hideLabel={hideLabel}
                label={label}
                placeholder={placeholder}
                editable={false}
                onFocus={() => {
                    if (showPicker) {
                        inputRef.current?.blur();
                    }
                }}
                onPressIn={onShowPicker}
                ref={inputRef}
                rightAddon={
                    <Icon
                        name={
                            showPicker ? "calendar-sharp" : "calendar-outline"
                        }
                        size={20}
                        color="primary"
                    />
                }
                value={date ? formatDate(date) : ""}
                {...inputProps}
            />
            <ThemedDatePicker
                onChange={onDateChange}
                visible={showPicker}
                onRequestClose={onClosePicker}
                value={date ?? new Date()}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
            />
        </>
    );
}
