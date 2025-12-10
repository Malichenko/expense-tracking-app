import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { stacks } from "../lib/stacks";
import theme from "@shared/config/theme";
import { AppRoutes } from "@shared/routes";

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.palette.primary[100],
        },
        headerTintColor: theme.palette.accent[50],
      }}
    >
      {stacks.map((stack) => (
        <Stack.Screen
          key={stack.name}
          name={stack.name}
          component={stack.component}
          options={stack.options}
        />
      ))}
    </Stack.Navigator>
  );
};
