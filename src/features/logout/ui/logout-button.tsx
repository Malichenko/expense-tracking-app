import React from "react";
import { Alert } from "react-native";

import { Button } from "@shared/ui/button";
import { authApi, authActions } from "@entities/auth";
import { showErrorAlert } from "@shared/utils/alert";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await authApi.logout();
            authActions.reset();
            onLogout?.();
          } catch (error) {
            showErrorAlert("Failed to logout", error);
          }
        },
      },
    ]);
  };

  return (
    <Button variant="secondary" onPress={handleLogout}>
      Logout
    </Button>
  );
};
