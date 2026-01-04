import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenLayout } from "@shared/ui";
import { AppRoutes, type RootStackParamList } from "@shared/routes";
import { AuthLayout } from "@entities/auth";
import { LoginForm } from "@features/login";

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, AppRoutes.Login>) => {
  const navigateToRegistration = () => {
    navigation.navigate(AppRoutes.Registration);
  };

  const navigateToMain = () => {
    navigation.replace(AppRoutes.MainTabs);
  };

  return (
    <ScreenLayout>
      <AuthLayout.Root>
        <AuthLayout.Header
          title="Welcome Back"
          subtitle="Sign in to your account"
        />

        <LoginForm onSuccess={navigateToMain} />

        <AuthLayout.Footer
          text="Don't have an account? "
          linkText="Sign up"
          onPress={navigateToRegistration}
        />
      </AuthLayout.Root>
    </ScreenLayout>
  );
};
