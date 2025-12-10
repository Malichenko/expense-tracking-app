import { Expense } from "../../../../model/types";

import { ReactElement } from "react";

interface ExpenseItemProps {
  item: Expense;
}

export type ExpenseItemContract = (
  props: ExpenseItemProps
) => ReactElement | null;
