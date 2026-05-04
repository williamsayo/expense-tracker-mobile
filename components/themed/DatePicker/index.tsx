import {
    DateTimePickerAndroid,
    type AndroidNativeProps,
} from "@react-native-community/datetimepicker";

export function openDatePicker(params: AndroidNativeProps) {
    return DateTimePickerAndroid.open(params);
    // DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])
}
