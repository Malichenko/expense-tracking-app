import { View, Text, StyleSheet } from "react-native";
import theme from "@shared/config/theme";
import { Button } from "../button";

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

export const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.x6,
    backgroundColor: theme.palette.primary[70],
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: theme.spacing.x2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
