import { Alert } from "react-native";

import { Button } from "@shared/ui/button";
import { authApi, authActions } from "@entities/auth";
import { showErrorAlert } from "@shared/utils/alert";
import { useAbortController } from "@shared/hooks";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const getSignal = useAbortController();

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
            await authApi.logout({ signal: getSignal() });
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
