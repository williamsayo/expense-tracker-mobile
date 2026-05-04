import type { ColorSchemeName } from "react-native";
import { Colors } from "@/constants/Colors";

interface Theme {
    overlay: string;
    mutedSurface: string;
    subtleSurface: string;
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    critical: string;
    warning: string;
    success: string;
    // background
    background: string;
    primaryBackground: string;
    invertedBackground: string;
    subtleBackground: string;
    mutedBackground: string;
    // border
    border: string;
    subtleBorder: string;
    mutedBorder: string;
    successBorder: string;
    criticalBorder: string;
    // text
    text: string;
    subtleText: string;
    mutedText: string;
    invertedText: string;
    warningText: string;
    linkText: string;
    successText: string;
    criticalText: string;
    placeholderText: string;
    primaryText: string;
    secondaryText: string;
    lightText: string;
    whiteText: string;
}

export interface ThemeDefinition {
    colors: {
        [key in NonNullable<ColorSchemeName>]: Theme;
    };
}

export const appTheme: ThemeDefinition = {
    colors: {
        dark: {
            overlay: Colors.black[100],
            mutedSurface: Colors.grey[300],
            subtleSurface: Colors.white[700],
            primary: Colors.blue[500],
            secondary: Colors["slate-blue"][800],
            tertiary: Colors["purple-blue"][800],
            neutral: Colors["purple-blue"][500],
            critical: Colors.red[300],
            warning: Colors.amber[300],
            success: Colors.green[500],
            // background
            background: Colors["purple-blue"][900],
            primaryBackground: Colors.blue[500],
            invertedBackground: Colors.white[100],
            subtleBackground: Colors["purple-blue"][700],
            mutedBackground: Colors.grey[400],
            // border
            border: Colors["purple-blue"][700],
            subtleBorder: Colors["purple-blue"][600],
            mutedBorder: Colors.grey[700],
            successBorder: Colors.green[200],
            criticalBorder: Colors.red[500],
            // text
            text: Colors.white[100],
            subtleText: Colors["slate-blue"][400],
            mutedText: Colors["purple-blue"][500],
            placeholderText: Colors["purple-blue"][600],
            primaryText: Colors.blue[400],
            secondaryText: Colors["slate-blue"][700],
            invertedText: Colors.grey[900],
            warningText: Colors.amber[200],
            linkText: Colors.blue[400],
            successText: Colors.green[200],
            criticalText: Colors.red[500],
            lightText: Colors.grey[900],
            // text on color but in the format of {color}Text
            whiteText: Colors.white[100],
            
        },
        light: {
            overlay: Colors.black[100],
            primary: Colors.blue[500],
            mutedSurface: Colors.grey[300],
            subtleSurface: Colors.white[700],
            secondary: Colors["slate-blue"][800],
            tertiary: Colors["slate-blue"][300],
            neutral: Colors.grey[500],
            critical: Colors.red[600],
            warning: Colors.amber[600],
            success: Colors.green[500],
            // background
            background: Colors.white[100],
            primaryBackground: Colors.blue[500],
            invertedBackground: Colors["purple-blue"][900],
            subtleBackground: Colors.grey[50],
            mutedBackground: Colors.grey[100],
            // border
            border: Colors.grey[300],
            subtleBorder: Colors.grey[200],
            mutedBorder: Colors.grey[50],
            successBorder: Colors.green[800],
            criticalBorder: Colors.red[600],
            // text
            text: Colors.grey[900],
            subtleText: Colors.grey[700],
            mutedText: Colors.grey[400],
            placeholderText: Colors.blue[400],
            primaryText: Colors.blue[700],
            secondaryText: Colors["slate-blue"][700],
            invertedText: Colors.white[100],
            warningText: Colors.amber[800],
            linkText: Colors.blue[500],
            successText: Colors.green[800],
            criticalText: Colors.red[600],
            lightText: Colors.grey[900],
            whiteText: Colors.white[100],
        },
    },
};

export type ThemeKey = keyof Theme;