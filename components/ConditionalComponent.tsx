import type { ReactNode } from "react";

export function ConditionalComponent({
    condition,
    children,
}: {
    condition: boolean;
    children: ReactNode;
}) {
    if (!condition) {
        return null;
    }

    return <>{children}</>;
}
