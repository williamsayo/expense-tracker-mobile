type FormatterOptions = {
    showDecimals?: boolean;
};

function parseNumber(value: number | string): number {
    return typeof value === "string"
        ? parseFloat(value.replace(",", "."))
        : value;
}

function parseDate(value: Date | string): Date {
    return typeof value === "string" ? new Date(value) : value;
}

export function formatMoney(
    amount: number | string,
    currency: string = "EUR",
    { showDecimals = true }: FormatterOptions = {},
) {
    const amountNumber = parseNumber(amount);
    return Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits:
            !Number.isInteger(amountNumber) || showDecimals ? 2 : 0,
    }).format(amountNumber);
}

export function formatPercentage(
    value: number | string,
    {
        showDecimals = false,
        decimals = 2,
    }: FormatterOptions & { decimals?: number } = {},
) {
    const numberValue = parseNumber(value);
    return Intl.NumberFormat(undefined, {
        style: "percent",
        minimumFractionDigits: showDecimals ? decimals : 0,
    }).format(numberValue);
}

export function formatDate(
    date: Date | string,
    style?: "short" | "medium" | "long" | "full",
) {
    const dateObj = parseDate(date);
    return Intl.DateTimeFormat(undefined, {
        dateStyle: style ?? "short",
    }).format(dateObj);
}

export function formatNumber(
    value: number,
    { showDecimals = false }: FormatterOptions = {},
) {
    const numberValue = parseNumber(value);
    return Intl.NumberFormat(undefined, {
        maximumFractionDigits:
            !Number.isInteger(numberValue) || showDecimals ? 2 : 0,
    }).format(value);
}
