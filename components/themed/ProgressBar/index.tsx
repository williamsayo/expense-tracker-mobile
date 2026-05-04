import { useThemeColor } from "@/lib/theme/use-theme-color";
import { ThemedView } from "../View";
import { ThemeKey } from "@/lib/theme/theme";

export type ProgressBar = {
    color?: ThemeKey;
    rounded?: ThemedView["rounded"];
    height?: number;
    containerProps?: ThemedView;
} & (
    | {
          current?: number;
          total: number;
          percentage?: never;
      }
    | {
          percentage: number;
          current?: never;
          total?: never;
      }
);

export function ProgressBar({
    current = 0,
    total,
    percentage,
    height = 8,
    color = "primary",
    rounded = "md",
    ...rest
}: ProgressBar) {
    const progressColor = useThemeColor(color);

    const progress =
        percentage !== undefined ? percentage : (current / total) * 100;

    return (
        <ThemedView
            accessibilityRole="progressbar"
            width="100%"
            height={height}
            bgColor="muted"
            rounded={rounded}
            {...rest}
            flex={1}
            overflow="hidden"
        >
            <ThemedView
                style={{
                    backgroundColor: progressColor,
                }}
                height="100%"
                width={`${progress}%`}
            />
        </ThemedView>
    );
}
