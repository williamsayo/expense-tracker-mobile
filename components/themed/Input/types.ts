import { COMPONENT_SIZES } from "@/lib/spacing/spacing";
import { ThemedTextColor } from "../Text/types";
import {
    ThemedViewBackgroundColor,
    ThemedViewBorderColor,
} from "../View/types";

export interface ThemedInputColors {
    borderColor: ThemedViewBorderColor | undefined;
    backgroundColor: ThemedViewBackgroundColor;
    textColor: ThemedTextColor;
    placeholderColor?: "muted" | "placeholder";
}

export type InputSizes = keyof typeof COMPONENT_SIZES.input;
