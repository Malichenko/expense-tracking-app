import { type NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { type FC } from "react";

import { AppRoutes } from "@shared/routes";

import { BottomTabNavigator } from "../ui/BottomTabNavigator";

type StackConfig<P = object> = {
  name: AppRoutes;
  component: FC<P>;
  options?: NativeStackNavigationOptions;
};

export const stacks: StackConfig[] = [
  {
    name: AppRoutes.MainTabs,
    component: BottomTabNavigator,
    options: {
      headerShown: false,
    },
  },
];
