import { useTheme } from "@shared/theme/ThemeContext";
import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  variant?: "regular" | "medium" | "semiBold" | "bold" | "extraBold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  color?: string;
};
export const ThemedText = ({
  variant = "regular",
  size = "md",
  color,
  style,
  children,
  ...props
}: ThemedTextProps) => {
  const { fonts, fontSizes, colors } = useTheme();

  const fontFamily = fonts[variant];
  const fontSize = fontSizes[size];

  const textColor = color
    ? colors[color as keyof typeof colors]
    : colors.brandBlack;

  return (
    <RNText
      style={[
        styles.base,
        {
          fontFamily,
          fontSize,
          color: textColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    margin: 0,
    padding: 0,
  },
});
