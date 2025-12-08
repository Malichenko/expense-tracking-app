import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackNavigator } from "../navigation";

export const RouterProvider = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
