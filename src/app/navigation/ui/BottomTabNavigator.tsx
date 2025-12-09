import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabs } from "../lib/tabs";
import theme from "@shared/config/theme";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.palette.primary[50],
        },
        headerTintColor: theme.palette.neutral[10],
        tabBarStyle: {
          backgroundColor: theme.palette.primary[50],
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.palette.accent[50],
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
