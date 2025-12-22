import { useEffect, useRef } from "react";
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
    } catch {
      // Error is handled in the store
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
