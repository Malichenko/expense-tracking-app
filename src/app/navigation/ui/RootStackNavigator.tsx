import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stacks } from "../lib/stacks";

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator>
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
