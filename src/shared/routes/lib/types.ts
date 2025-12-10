import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppRoutes } from "./dictionary";

export type RootStackParamList = {
  [AppRoutes.MainTabs]: undefined;
  [AppRoutes.RecentExpenses]: undefined;
  [AppRoutes.AllExpenses]: undefined;
  [AppRoutes.ManageExpense]: { expenseId: string } | undefined;
};

export type ManageExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppRoutes.ManageExpense
>;

export type ScreenProps = {
  [AppRoutes.ManageExpense]: NativeStackScreenProps<
    RootStackParamList,
    AppRoutes.ManageExpense
  >;
};
