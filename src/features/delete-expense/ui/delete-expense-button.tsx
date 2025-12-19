import { IconButton } from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseDelete } from "@entities/expense";

interface DeleteExpenseButtonProps {
  id: string;
  onDelete?: () => void;
}

export const DeleteExpenseButton = ({
  id,
  onDelete,
}: DeleteExpenseButtonProps) => {
  const expenseDelete = useExpenseDelete();

  const handleDelete = () => {
    expenseDelete(id);
    onDelete?.();
  };

  return (
    <IconButton
      icon="trash"
      onPress={handleDelete}
      color={theme.palette.error[50]}
      size="large"
    />
  );
};
