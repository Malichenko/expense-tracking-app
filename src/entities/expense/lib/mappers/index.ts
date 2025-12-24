import type { Expense } from "../../model/types";

export type ExpenseDto = {
  amount: number;
  date: string;
  description: string;
};

export type ExpenseRecord = Record<string, ExpenseDto>;

export const mapExpenseDtoToEntity = (
  id: string,
  dto: ExpenseDto
): Expense => ({
  id,
  amount: dto.amount,
  date: new Date(dto.date),
  description: dto.description,
});

export const mapExpenseRecordToEntities = (
  record: ExpenseRecord
): Expense[] => {
  return Object.entries(record).map(([id, dto]) =>
    mapExpenseDtoToEntity(id, dto)
  );
};

export const mapEntityToDto = (entity: Omit<Expense, "id">): ExpenseDto => ({
  amount: entity.amount,
  date: entity.date.toISOString(),
  description: entity.description,
});
