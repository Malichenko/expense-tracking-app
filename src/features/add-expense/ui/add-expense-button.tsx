import { IconButton } from "@shared/ui";
import theme from "@shared/config/theme";

export const AddExpenseButton = () => {
  return (
    <IconButton
      icon="add"
      onPress={() => console.log("Pressed")}
      size="large"
      color={theme.palette.accent[50]}
      accessibilityLabel="Add new item"
    />
  );
};
