import { useCallback, useState } from "react";
import type { BlurEvent, FocusEvent } from "react-native";

interface Props {
    onBlur?: ((e: BlurEvent) => void) | undefined;
    onFocus?: ((e: FocusEvent) => void) | undefined;
}

export function useFieldFocused({ onFocus, onBlur }: Props) {
    const [isActive, setIsActive] = useState(false);

    const handleFocus = useCallback(
        (e: FocusEvent) => {
            setIsActive(true);
            onFocus?.(e);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (e: BlurEvent) => {
            setIsActive(false);
            onBlur?.(e);
        },
        [onBlur],
    );

    return {
        handleBlur,
        handleFocus,
        isActive,
    };
}
