import { useTheme } from "@shared/theme/ThemeContext";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {
  backgroundColor?: string;
};
export const ThemedView = ({
  backgroundColor,
  style,
  children,
  ...props
}: ThemedViewProps) => {
  const { colors } = useTheme();

  const bgColor = backgroundColor
    ? (colors as any)[backgroundColor] || backgroundColor
    : undefined;

  return (
    <View
      style={[bgColor && { backgroundColor: bgColor }, styles.base, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 13,
  },
});
