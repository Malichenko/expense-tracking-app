import { useEffect, useRef } from "react";
import { IconButton } from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseDelete } from "@entities/expense";
import { Alert } from "react-native";

interface DeleteExpenseButtonProps {
  id: string;
  onDelete?: () => void;
}

export const DeleteExpenseButton = ({
  id,
  onDelete,
}: DeleteExpenseButtonProps) => {
  const expenseDelete = useExpenseDelete();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleDelete = async () => {
    abortControllerRef.current = new AbortController();
    try {
      await expenseDelete(id, { signal: abortControllerRef.current.signal });
      onDelete?.();
    } catch (error) {
      const message =
        error instanceof Error
          ? `Please try again.\n\n${error.message}`
          : "Please try again.";

      Alert.alert("Failed to delete expense", message);
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
