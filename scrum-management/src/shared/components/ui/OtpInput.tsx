import { useTheme } from "@shared/theme/ThemeContext";
import { AppColors, FontSizes } from "@shared/theme/appTheme";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

type OtpInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
  style?: ViewStyle;
  error?: boolean;
};

export const OtpInput = ({
  length = 6,
  onComplete,
  onChange,
  style,
  error = false,
}: OtpInputProps) => {
  const { colors, fonts, fontSizes } = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    // only numbers
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];

    // if pasted more than one character
    if (text.length > 1) {
      const digits = text.slice(0, length).split("");
      digits.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);

      // focus last field or next empty
      const nextIndex = Math.min(index + digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      const otpString = newOtp.join("");
      onChange?.(otpString);
      if (otpString.length === length) {
        onComplete?.(otpString);
      }
      return;
    }

    // input single character
    newOtp[index] = text;
    setOtp(newOtp);

    // focus next field
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = newOtp.join("");
    onChange?.(otpString);

    // call onComplete when all fields are filled
    if (otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // go back to previous field when backspace is pressed
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // select text when focused
    if (otp[index]) {
      inputRefs.current[index]?.setNativeProps({
        selection: { start: 0, end: 1 },
      });
    }
  };

  const handlePressBox = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <View style={[styles.container, style]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handlePressBox(index)}
            style={styles.pressableWrapper}
          >
            <TextInput
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[
                styles.input,
                {
                  backgroundColor: otp[index]
                    ? AppColors.whiteGrey
                    : AppColors.white,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              selectTextOnFocus
              textAlign="center"
            />
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  pressableWrapper: {
    flex: 1,
  },
  input: {
    width: 45,
    height: 54,
    borderWidth: 1,
    borderRadius: 55,
    textAlign: "center",
    color: AppColors.brandBlack,
    fontWeight: "bold",
    fontSize: FontSizes.xl,
    borderColor: AppColors.lightGrey,
  },
});
