import { StyleSheet } from "react-native";

import theme from "@shared/config/theme";

export const styles = StyleSheet.create({
  button: {
    borderRadius: theme.spacing.x5,
    paddingVertical: theme.spacing.x3,
    paddingHorizontal: theme.spacing.x6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: theme.palette.shadow.black,
    shadowOffset: { width: 0, height: theme.spacing.x1 },
    shadowOpacity: 0.2,
    shadowRadius: theme.spacing.x2,
    overflow: "hidden",
  },
  text: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: theme.palette.primary[70],
    borderColor: theme.palette.accent[50],
    borderWidth: 1,
  },
  textPrimary: {
    color: theme.palette.primary[10],
  },
  buttonSecondary: {
    backgroundColor: theme.palette.secondary[70],
    borderColor: theme.palette.secondary[30],
    borderWidth: 1,
  },
  textSecondary: {
    color: theme.palette.neutral[10],
  },
  buttonDanger: {
    backgroundColor: theme.palette.error[60],
    borderColor: theme.palette.error[40],
    borderWidth: 1,
  },
  textDanger: {
    color: theme.palette.neutral[10],
  },
  buttonFlat: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    elevation: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  textFlat: {
    color: theme.palette.primary[10],
  },
  disabled: {
    opacity: 0.5,
  },
});
