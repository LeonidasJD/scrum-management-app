import { useTheme } from "@shared/theme/ThemeContext";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { AppColorScheme, AppFontSize } from "../../theme/appTheme";
import { ThemedText } from "./ThemedText";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ThemedButtonProps = Omit<PressableProps, "style"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export const ThemedButton = ({
  variant = "primary",
  size = "md",
  title,
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
  onPress,
  ...props
}: ThemedButtonProps) => {
  const { colors } = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: colors.brandBlack,
      borderColor: colors.brandBlack,
      borderWidth: 2,
      textColor: "white",
      borderRadius: 101,
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: colors.brandBlack,
      borderWidth: 2,
      textColor: "brandBlack",
      borderRadius: 101,
    },
  };

  const sizeStyles = {
    sm: {
      paddingVertical: 3,
      paddingHorizontal: 24,
      fontSize: "md",
      fontVariant: "bold" as const,
      flexDirection: "row",
      gap: 10,
    },
    md: {
      paddingVertical: 8,
      paddingHorizontal: 24,
      fontSize: "md",
      fontVariant: "bold" as const,
      flexDirection: "row",
      gap: 15,
    },
    lg: {
      paddingVertical: 14,
      paddingHorizontal: 50,
      fontSize: "md",
      fontVariant: "bold" as const,
      flexDirection: "row",
      gap: 25,
    },
  };

  const disabledStyles = {
    backgroundColor: colors.lightGrey,
    borderColor: colors.lightGrey,
    opacity: 0.6,
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => {
        const baseStyles = [
          styles.base,
          {
            backgroundColor: currentVariant.backgroundColor,
            borderColor: currentVariant.borderColor,
            borderWidth: currentVariant.borderWidth,
            borderRadius: currentVariant.borderRadius,
            paddingVertical: currentSize.paddingVertical,
            paddingHorizontal: currentSize.paddingHorizontal,
            flexDirection: currentSize.flexDirection as "row",
            gap: currentSize.gap,
          },
          fullWidth && styles.fullWidth,
          isDisabled && disabledStyles,
          pressed && !isDisabled && styles.pressed,
          style,
        ];
        return baseStyles;
      }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.white : colors.brandBlack}
        />
      ) : (
        <>
          <ThemedText
            variant={currentSize.fontVariant}
            size={currentSize.fontSize as AppFontSize}
            color={
              isDisabled
                ? colors.grey
                : (currentVariant.textColor as AppColorScheme)
            }
            style={styles.text}
          >
            {title}
          </ThemedText>
          {icon && icon}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  fullWidth: {
    width: "100%",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
  },
});
