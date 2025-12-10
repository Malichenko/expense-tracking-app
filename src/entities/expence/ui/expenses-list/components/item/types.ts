import { Expense } from "../../../../model/types";

import { ReactElement } from "react";

interface ExpenseItemProps {
  item: Pick<Expense, "description" | "amount">;
}

export type ExpenseItemContract = (
  props: ExpenseItemProps
) => ReactElement | null;
