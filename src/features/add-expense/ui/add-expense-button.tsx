import { AppRoutes, useAppNavigation } from "@shared/routes";
import { IconButton } from "@shared/ui";

export const AddExpenseButton = ({ color }: { color?: string }) => {
  const navigation = useAppNavigation();

  const expensePressHandler = () => {
    navigation.navigate(AppRoutes.ManageExpense);
  };

  return (
    <IconButton
      icon="add"
      onPress={expensePressHandler}
      size="large"
      color={color}
      accessibilityLabel="Add new item"
    />
  );
};
