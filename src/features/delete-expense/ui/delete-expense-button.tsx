import { IconButton } from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseActions } from "@entities/expense";
import { useUser } from "@entities/auth";
import { useAbortController } from "@shared/hooks";
import { showErrorAlert } from "@shared/utils/alert";

interface DeleteExpenseButtonProps {
  id: string;
  onDelete?: () => void;
}

export const DeleteExpenseButton = ({
  id,
  onDelete,
}: DeleteExpenseButtonProps) => {
  const user = useUser();
  const { remove } = useExpenseActions();
  const getSignal = useAbortController();

  const handleDelete = async () => {
    if (!user?.uid) return;

    try {
      await remove(id, { signal: getSignal(), userId: user.uid });
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
