const ThemedTextColor = [
    "subtle",
    "muted",
    "placeholder",
    "default",
    "primary",
    "secondary",
    "inverted",
    "warning",
    "link",
    "success",
    "critical",
    "light",
    'white',
] as const;

export type ThemedTextColor = (typeof ThemedTextColor)[number];
