import { Alert } from "react-native";

import { IconButton } from "@shared/ui";
import { userActions } from "@entities/user";
import { logoutApi } from "../api";
import { showErrorAlert } from "@shared/utils/alert";

interface LogoutButtonProps {
  onLogout?: () => void;
  color?: string;
}

export const LogoutButton = ({ onLogout, color }: LogoutButtonProps) => {
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
            await logoutApi.logout();
            userActions.reset();
            onLogout?.();
          } catch (error) {
            showErrorAlert("Failed to logout", error);
          }
        },
      },
    ]);
  };

  return (
    <IconButton icon="log-out-outline" onPress={handleLogout} color={color} />
  );
};
