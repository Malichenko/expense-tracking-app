import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppRoutes } from "./dictionary";

export type RootStackParamList = {
  [AppRoutes.MainTabs]: undefined;
  [AppRoutes.RecentExpenses]: undefined;
  [AppRoutes.AllExpenses]: undefined;
  [AppRoutes.ManageExpense]: { expenseId: string } | undefined;
  [AppRoutes.Login]: undefined;
  [AppRoutes.Registration]: undefined;
};

export type ManageExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppRoutes.ManageExpense
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppRoutes.Login
>;

export type RegistrationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppRoutes.Registration
>;

export type ScreenProps = {
  [AppRoutes.ManageExpense]: NativeStackScreenProps<
    RootStackParamList,
    AppRoutes.ManageExpense
  >;
  [AppRoutes.Login]: NativeStackScreenProps<
    RootStackParamList,
    AppRoutes.Login
  >;
  [AppRoutes.Registration]: NativeStackScreenProps<
    RootStackParamList,
    AppRoutes.Registration
  >;
};
