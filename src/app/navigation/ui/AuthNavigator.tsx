import { type FC, type PropsWithChildren } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuthStore } from "@entities/auth";
import { type RootStackParamList } from "@shared/routes";
import { stacks } from "../lib/stacks";

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export const AuthNavigator: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null; // Loading overlay will be handled by parent
  }

  if (!isAuthenticated) {
    return (
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
      >
        {stacks.auth.map((stack) => (
          <AuthStack.Screen
            key={stack.name}
            name={stack.name}
            component={stack.component}
            options={stack.options}
          />
        ))}
      </AuthStack.Navigator>
    );
  }

  return children;
};
