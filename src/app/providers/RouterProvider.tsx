import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "../navigation";

export const RouterProvider = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
