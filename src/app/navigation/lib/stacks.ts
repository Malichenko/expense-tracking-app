import {
  NativeStackNavigationProp,
  type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { type FC } from "react";

import { AppRoutes, RootStackParamList } from "@shared/routes";

import { BottomTabNavigator } from "../ui/BottomTabNavigator";
import { ManageExpenseScreen } from "@screens/manage-expense";
import { RouteProp } from "@react-navigation/native";
import * as ReactNavigation from "@react-navigation/native";

type StackConfig<P = object> = {
  name: AppRoutes;
  component: FC<P>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<RootStackParamList, AppRoutes>;
        navigation: NativeStackNavigationProp<RootStackParamList>;
        theme: ReactNavigation.Theme;
      }) => NativeStackNavigationOptions);
};

export const stacks: StackConfig[] = [
  {
    name: AppRoutes.MainTabs,
    component: BottomTabNavigator,
    options: {
      title: "Expenses",
      headerShown: false,
    },
  },
  {
    name: AppRoutes.ManageExpense,
    component: ManageExpenseScreen,
    options: ({ route }) => ({
      title: route.params?.expenseId ? "Edit Expense" : "Add Expense",
      presentation: "modal",
    }),
  },
];
