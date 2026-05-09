import { Route, useRouter } from "expo-router";
import { ThemedButton } from "./themed/Button";

export default function HeaderButton({
    children,
    variant = "text",
    href,
    onPress,
    accessibilityRole,
    ...props
}: ThemedButton & { href?: Route }) {
    const router = useRouter();

    if (!href && !router.canGoBack() && !onPress) {
        return null;
    }

    return (
        <ThemedButton
            accessibilityRole={!href || !onPress ? accessibilityRole : "link"}
            variant={variant}
            {...props}
            onPress={href ? () => router.push(href) : onPress || router.back}
        >
            {children}
        </ThemedButton>
    );
}
