import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabs } from "../lib/tabs";
import theme from "@shared/config/theme";
import { AddExpenseButton } from "@features/add-expense";
import { RootStackParamList } from "@shared/routes";

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.palette.primary[100],
        },
        headerTintColor: theme.palette.accent[50],
        tabBarStyle: {
          backgroundColor: theme.palette.primary[100],
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.palette.accent[50],
        headerRight: ({ tintColor }) => <AddExpenseButton color={tintColor} />,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};
