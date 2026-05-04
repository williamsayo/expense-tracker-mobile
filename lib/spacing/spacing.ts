import { ButtonSize } from "../tokens";

const BASE_UNIT = 4;

const BASE_SPACING = {
    0: 0,
    0.5: BASE_UNIT * 0.5, // 2px
    1: BASE_UNIT * 1, // 4px
    1.5: BASE_UNIT * 1.5, // 6px
    2: BASE_UNIT * 2, // 8px
    2.5: BASE_UNIT * 2.5, // 10px
    3: BASE_UNIT * 3, // 12px
    3.5: BASE_UNIT * 3.5, // 14px
    4: BASE_UNIT * 4, // 16px
    4.5: BASE_UNIT * 4.5, // 18px
    5: BASE_UNIT * 5, // 20px
    6: BASE_UNIT * 6, // 24px
    7: BASE_UNIT * 7, // 28px
    8: BASE_UNIT * 8, // 32px
    8.5: BASE_UNIT * 8.5, // 34px
    9: BASE_UNIT * 9, // 36px
    10: BASE_UNIT * 10, // 40px
    11: BASE_UNIT * 11, // 44px
    12: BASE_UNIT * 12, // 48px
    14: BASE_UNIT * 14, // 56px
    15: BASE_UNIT * 15, // 60px
    16: BASE_UNIT * 16, // 64px
    18: BASE_UNIT * 18, // 72px
    20: BASE_UNIT * 20, // 80px
    24: BASE_UNIT * 24, // 96px
    25: BASE_UNIT * 25, // 100px
    26: BASE_UNIT * 26, // 104px
    28: BASE_UNIT * 28, // 112px
    32: BASE_UNIT * 32, // 128px
    36: BASE_UNIT * 36, // 144px
    40: BASE_UNIT * 40, // 160px
    44: BASE_UNIT * 44, // 176px
    48: BASE_UNIT * 48, // 192px
    52: BASE_UNIT * 52, // 208px
    56: BASE_UNIT * 56, // 224px
    60: BASE_UNIT * 60, // 240px
    64: BASE_UNIT * 64, // 256px
    72: BASE_UNIT * 72, // 288px
    80: BASE_UNIT * 80, // 320px
    96: BASE_UNIT * 96, // 384px
} as const;

export const COMPONENT_SPACING: {
    buttonPadding: { x: Spacing; y: Spacing };
    inputPadding: { x: Spacing; y: Spacing };
    iconSize: { button: number };
} = {
    buttonPadding: { x: 3, y: 2 },
    iconSize: { button: 20 },
    inputPadding: { x: 3, y: 3 },
} as const;

export const COMPONENT_SIZES: {
    button: Record<ButtonSize, { minHeight: number; minWidth: number }>;
    input: {
        sm: { minHeight: number };
        md: { minHeight: number };
        lg: { minHeight: number };
        multiline: { minHeight: number };
    };
} = {
    button: {
        icon: { minHeight: 40, minWidth: 40 },
        lg: { minHeight: 46, minWidth: 140 },
        md: { minHeight: 44, minWidth: 116 },
        sm: { minHeight: 42, minWidth: 92 },
        xl: { minHeight: 50, minWidth: 164 },
    },
    input: {
        lg: { minHeight: 52 },
        md: { minHeight: 44 },
        sm: { minHeight: 36 },
        multiline: { minHeight: 100 },
    },
} as const;

export type Spacing = keyof typeof BASE_SPACING;
export const Spacing = BASE_SPACING;
