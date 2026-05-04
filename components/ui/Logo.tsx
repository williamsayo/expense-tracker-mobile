import { useMemo } from "react";
import { Image, ImageProps, ImageStyle, useColorScheme } from "react-native";

const AppLightLogo = require("@/assets/logo/expensio_light.png");
const AppDarkLogo = require("@/assets/logo/expensio_dark.png");

export default function Logo({
    style,
    size = 100,
    height,
    width,
    ...props
}: ImageProps & { size?: number; height?: number; width?: number }) {
    const colorScheme = useColorScheme();
    const logo = colorScheme === "dark" ? AppDarkLogo : AppLightLogo;

    const logoStyle: ImageStyle = useMemo(
        () => ({
            height: height ? height : size,
            width: width ? width : size,
            objectFit: "cover",
        }),
        [size, height, width],
    );

    return <Image source={logo} style={[logoStyle, style]} {...props} />;
}
