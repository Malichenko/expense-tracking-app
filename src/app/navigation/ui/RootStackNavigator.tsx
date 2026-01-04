import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stacks } from "../lib/stacks";
import theme from "@shared/config/theme";
import { RootStackParamList } from "@shared/routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      {stacks.main.map((stack) => (
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
