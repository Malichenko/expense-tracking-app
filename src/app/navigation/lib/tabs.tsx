import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { AppRoutes } from "@shared/routes/lib/dictionary";
import { RecentExpensesScreen } from "@screens/recent-expenses";
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
    name: AppRoutes.RecentExpenses,
    component: RecentExpensesScreen,
    options: {
      title: "Recent Expenses",
      tabBarLabel: "Recent",
      tabBarIcon: IconTodayView,
    },
  },
  {
    name: AppRoutes.AllExpenses,
    component: AllExpensesScreen,
    options: {
      title: "All Expenses",
      tabBarIcon: IconCalendarView,
    },
  },
];
