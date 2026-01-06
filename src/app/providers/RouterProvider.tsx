import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  useUserStatus,
  useInitializeUser,
  useIsAuthenticated,
} from "@entities/user";
import { AuthNavigator } from "../navigation/ui/AuthNavigator";
import { LoadingOverlay } from "@shared/ui";
import { RootStackNavigator } from "@app/navigation";
import { conditional, pipe, isTruthy } from "remeda";

const getProtectedNavigator = (isAuthenticated: boolean) =>
  pipe(
    isAuthenticated,
    conditional([isTruthy, () => <RootStackNavigator />], () => (
      <AuthNavigator />
    ))
  );

export const RouterProvider = () => {
  const { isLoading } = useUserStatus();
  const isAuthenticated = useIsAuthenticated();

  // Initialize user on app start
  useInitializeUser();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      {getProtectedNavigator(isAuthenticated)}
    </NavigationContainer>
  );
};
