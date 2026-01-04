import {
  NativeStackNavigationProp,
  type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { FC } from "react";
import { AppRoutes, RootStackParamList } from "@shared/routes";
import { BottomTabNavigator } from "../ui/BottomTabNavigator";
import { ManageExpenseScreen } from "@screens/manage-expense";
import { LoginScreen } from "@screens/login";
import { RegistrationScreen } from "@screens/registration";
import * as ReactNavigation from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StackConfig<P = any> = {
  name: AppRoutes;
  component: FC<P>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<RootStackParamList, AppRoutes>;
        navigation: NativeStackNavigationProp<RootStackParamList, AppRoutes>;
        theme: ReactNavigation.Theme;
      }) => NativeStackNavigationOptions);
};

type StackKey = "auth" | "main";

export const stacks: Record<StackKey, StackConfig[]> = {
  auth: [
    {
      name: AppRoutes.Login,
      component: LoginScreen,
      options: {
        title: "Login",
        headerShown: false,
      },
    },
    {
      name: AppRoutes.Registration,
      component: RegistrationScreen,
      options: {
        title: "Registration",
        headerShown: false,
      },
    },
  ],
  main: [
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
  ],
};
