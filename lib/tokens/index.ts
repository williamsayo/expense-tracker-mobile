import { Platform } from "react-native";
import { Spacing } from "../spacing/spacing";

export const elevations = {
    surface: Platform.select({
        android: {
            elevation: 0,
        },
        ios: {
            shadowColor: "transparent",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
    }),
    raised: Platform.select({
        android: {
            elevation: 2,
        },
        ios: {
            shadowColor: "#000",
            shadowOffset: { height: 1.5, width: 0 },
            shadowOpacity: 0.07,
            shadowRadius: 3,
        },
    }),
    floating: Platform.select({
        android: {
            elevation: 4,
        },
        ios: {
            shadowColor: "#000",
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
    }),
    overlay: Platform.select({
        android: {
            elevation: 6,
        },
        ios: {
            shadowColor: "#000",
            shadowOffset: { height: 4, width: 0 },
            shadowOpacity: 0.17,
            shadowRadius: 6,
        },
    }),
    toast: Platform.select({
        android: {
            elevation: 8,
        },
        ios: {
            shadowColor: "#000",
            shadowOffset: { height: 8, width: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
        },
    }),
} as const;

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export const fontSizes = {
    xs: Spacing[3],
    base: Spacing[4],
    sm: Spacing[3.5],
    lg: Spacing[4.5],
    xl: Spacing[5],
    "2xl": Spacing[6],
    "3xl": Spacing[7],
    "4xl": Spacing[8],
    "5xl": Spacing[9],
} as const;

export const typography = {
    fontFamily: {
        display: "Manrope",
        primary: "Manrope",
        secondary: "Manrope",
        mono: "Inter",
    },
    fontWeight: {
        thin: "100" as const,
        extralight: "200" as const,
        light: "300" as const,
        normal: "400" as const,
        medium: "500" as const,
        semibold: "600" as const,
        bold: "700" as const,
        extrabold: "800" as const,
        black: "900" as const,
    },
    letterSpacing: {
        tightest: -0.32,
        tighter: -0.16,
        tight: -0.08,
        tightish: -0.04,
        normal: 0,
        loose: 0.04,
        looser: 0.08,
        wide: 0.12,
        loosest: 0.2,
    },
    lineHeight: {
        tight: 1.2,
        snug: 1.3,
        normal: 1.4,
        relaxed: 1.5,
        loose: 1.6,
        veryLoose: 1.8,
    },

    // style presets
    headings: {
        h1: {
            size: "5xl" as const,
            weight: "bold" as const,
            lineHeight: "tight" as const,
            letterSpacing: "tightest" as const,
        },
        h2: {
            size: "4xl" as const,
            weight: "bold" as const,
            lineHeight: "tight" as const,
            letterSpacing: "tightest" as const,
        },
        h3: {
            size: "3xl" as const,
            weight: "semibold" as const,
            lineHeight: "snug" as const,
            letterSpacing: "tighter" as const,
        },
        h4: {
            size: "2xl" as const,
            weight: "semibold" as const,
            lineHeight: "snug" as const,
            letterSpacing: "tighter" as const,
        },
        h5: {
            size: "base" as const,
            weight: "semibold" as const,
            lineHeight: "normal" as const,
            letterSpacing: "tight" as const,
        },
    },
    body: {
        lg: {
            size: "xl" as const,
            weight: "normal" as const,
            lineHeight: "loose" as const,
            letterSpacing: "normal" as const,
        },
        md: {
            size: "lg" as const,
            weight: "normal" as const,
            lineHeight: "relaxed" as const,
            letterSpacing: "normal" as const,
        },
        sm: {
            size: "base" as const,
            weight: "normal" as const,
            lineHeight: "relaxed" as const,
            letterSpacing: "normal" as const,
        },
        xs: {
            size: "sm" as const,
            weight: "normal" as const,
            lineHeight: "normal" as const,
            letterSpacing: "normal" as const,
        },
    },
    label: {
        lg: {
            size: "base" as const,
            weight: "semibold" as const,
            lineHeight: "snug" as const,
            letterSpacing: "loose" as const,
        },
        md: {
            size: "sm" as const,
            weight: "semibold" as const,
            lineHeight: "tight" as const,
            letterSpacing: "looser" as const,
        },
        sm: {
            size: "xs" as const,
            weight: "semibold" as const,
            lineHeight: "tight" as const,
            letterSpacing: "loosest" as const,
        },
    },
    mono: {
        lg: {
            size: "lg" as const,
            weight: "medium" as const,
            lineHeight: "normal" as const,
            letterSpacing: "tighter" as const,
        },
        md: {
            size: "base" as const,
            weight: "medium" as const,
            lineHeight: "normal" as const,
            letterSpacing: "tighter" as const,
        },
        sm: {
            size: "sm" as const,
            weight: "medium" as const,
            lineHeight: "normal" as const,
            letterSpacing: "tighter" as const,
        },
    },
    button: {
        lg: {
            size: "lg" as const,
            weight: "semibold" as const,
            lineHeight: "normal" as const,
            letterSpacing: "wide" as const,
        },
        md: {
            size: "base" as const,
            weight: "semibold" as const,
            lineHeight: "normal" as const,
            letterSpacing: "wide" as const,
        },
        sm: {
            size: "sm" as const,
            weight: "semibold" as const,
            lineHeight: "normal" as const,
            letterSpacing: "wide" as const,
        },
    },
} as const;

export const borderRadius = {
    "2xl": 20,
    "2xs": 2,
    "3xl": 24,
    "4xl": 32,
    "5xl": 40,
    base: 8,
    full: 9999,
    lg: 12,
    md: 10,
    none: 0,
    sm: 6,
    xl: 16,
    xs: 4,
} as const;

export const mixins = {
    absolute: {
        bottom: 0,
        left: 0,
        position: "absolute" as const,
        right: 0,
        top: 0,
    },
    center: {
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
    row: {
        alignItems: "center" as const,
        flexDirection: "row" as const,
    },
    rowCenter: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
    between: {
        flexDirection: "row" as const,
        justifyContent: "space-between" as const,
    },
} as const;

export type Elevation = keyof typeof elevations;
export type BorderRadius = keyof typeof borderRadius;
export type Mixins = typeof mixins;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof typography.fontWeight;
export type FontFamily = keyof typeof typography.fontFamily;
export type LetterSpacing = keyof typeof typography.letterSpacing;
export type LineHeight = keyof typeof typography.lineHeight;
