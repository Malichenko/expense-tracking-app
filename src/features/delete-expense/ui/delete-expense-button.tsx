import { IconButton } from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseActions } from "@entities/expense";
import { useAbortController } from "@shared/lib/hooks";
import { showErrorAlert } from "@shared/utils/alert";

interface DeleteExpenseButtonProps {
  id: string;
  onDelete?: () => void;
}

export const DeleteExpenseButton = ({
  id,
  onDelete,
}: DeleteExpenseButtonProps) => {
  const { remove } = useExpenseActions();
  const getSignal = useAbortController();

  const handleDelete = async () => {
    try {
      await remove(id, { signal: getSignal() });
      onDelete?.();
    } catch (error) {
      showErrorAlert("Failed to delete expense", error);
    }
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
