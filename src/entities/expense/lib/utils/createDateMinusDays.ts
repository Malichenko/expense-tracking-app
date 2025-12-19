import { MILLISECONDS_PER_DAY } from "../constants";

export const createDateMinusDays = (days: number): Date => {
  const now = Date.now();
  return new Date(now - days * MILLISECONDS_PER_DAY);
};
