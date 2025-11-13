export const AppColors = {
  white: "#FFFFFF",
  red: "#AE0E0E",
  blue: "#1687CD",
  green: "#39AE0E",
  orange: "#F8AC20",
  whiteGrey: "#F0F0F0",
  lightGrey: "#D0D0D0",
  grey: "#686868",
  darkGrey: "#626262",
  brandBlack: "#141414",
} as const;

export const Colors = {
  light: AppColors,
  dark: {
    ...AppColors,
  },
} as const;

export const FontFamilies = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  semiBold: "Manrope-SemiBold",
  bold: "Manrope-Bold",
  extraBold: "Manrope-ExtraBold",
} as const;

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 26,
  xxxl: 42,
} as const;

export type AppColorScheme = keyof typeof Colors.light;
export type AppFontFamily = keyof typeof FontFamilies;
export type AppFontSize = keyof typeof FontSizes;
