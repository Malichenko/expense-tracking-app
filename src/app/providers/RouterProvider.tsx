import React, { FC } from "react";
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

interface ProtectedNavigatorProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ProtectedNavigator: FC<ProtectedNavigatorProps> = (flags) =>
  pipe(
    flags,
    conditional(
      [({ isLoading }) => isTruthy(isLoading), LoadingOverlay],
      [({ isAuthenticated }) => isTruthy(isAuthenticated), RootStackNavigator],
      AuthNavigator
    )
  );

export const RouterProvider = () => {
  const { isLoading } = useUserStatus();
  const isAuthenticated = useIsAuthenticated();

  // Initialize user on app start
  useInitializeUser();

  return (
    <NavigationContainer>
      <ProtectedNavigator
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
    </NavigationContainer>
  );
};
