import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "@shared/config/theme";

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const AuthFooterLink = ({
  text,
  linkText,
  onPress,
}: AuthFooterLinkProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.x4,
  },
  text: {
    color: theme.palette.neutral[40],
    fontSize: theme.fontSize.base,
  },
  link: {
    color: theme.palette.accent[50],
    fontSize: theme.fontSize.base,
    fontWeight: "600",
  },
});
