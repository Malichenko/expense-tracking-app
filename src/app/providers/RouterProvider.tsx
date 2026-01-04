import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuthStore } from "@entities/auth";
import { useInitializeAuth } from "@entities/auth";
import { AuthNavigator } from "../navigation/ui/AuthNavigator";
import { LoadingOverlay } from "@shared/ui";
import { RootStackNavigator } from "@app/navigation";

export const RouterProvider = () => {
  const { isLoading } = useAuthStore();

  // Initialize auth on app start
  useInitializeAuth();

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
