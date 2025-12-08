import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { AppRoutes } from "@shared/routes/lib/dictionary";
import { HomeScreen } from "@screens/home";
import { AllExpensesScreen } from "@screens/all-expenses";
import { FC } from "react";
import { IconTodayView, IconCalendarView } from "@shared/routes";

type TabConfig<P = object> = {
  name: AppRoutes;
  component: FC<P>;
  options?: BottomTabNavigationOptions;
};

export const tabs: TabConfig[] = [
  {
    name: AppRoutes.Home,
    component: HomeScreen,
    options: {
      title: "Recent Expenses",
      tabBarIcon: IconTodayView,
    },
  },
  {
    name: AppRoutes.Settings,
    component: AllExpensesScreen,
    options: {
      title: "All Expenses",
      tabBarIcon: IconCalendarView,
    },
  },
];
