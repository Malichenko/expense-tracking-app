import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useUserStatus, useInitializeUser } from "@entities/user";
import { AuthNavigator } from "../navigation/ui/AuthNavigator";
import { LoadingOverlay } from "@shared/ui";
import { RootStackNavigator } from "@app/navigation";

export const RouterProvider = () => {
  const { isLoading } = useUserStatus();

  // Initialize user on app start
  useInitializeUser();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      <AuthNavigator>
        <RootStackNavigator />
      </AuthNavigator>
    </NavigationContainer>
  );
};
