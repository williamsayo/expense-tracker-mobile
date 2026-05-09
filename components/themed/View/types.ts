const ThemedViewBorderColor = [
    "default",
    "subtle",
    "muted",
    "transparent",
    "critical",
    "success",
] as const;

const ThemedViewBackgroundColor = [
    "default",
    "subtle",
    "inverted",
    "muted",
    "transparent",
    "primary",
    "primaryMuted",
] as const;

export type ThemedViewBackgroundColor =
    (typeof ThemedViewBackgroundColor)[number];
export type ThemedViewBorderColor = (typeof ThemedViewBorderColor)[number];
