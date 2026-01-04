import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenLayout } from "@shared/ui";
import { AuthLayout } from "@entities/auth";
import { AppRoutes, type RootStackParamList } from "@shared/routes";
import { RegistrationForm } from "@features/registration";

export const RegistrationScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, AppRoutes.Registration>) => {
  const navigateToLogin = () => {
    navigation.navigate(AppRoutes.Login);
  };

  return (
    <ScreenLayout>
      <AuthLayout.Root>
        <AuthLayout.Header
          title="Create Account"
          subtitle="Join us and start tracking your expenses"
        />

        <RegistrationForm />

        <AuthLayout.Footer
          text="Already have an account? "
          linkText="Sign in"
          onPress={navigateToLogin}
        />
      </AuthLayout.Root>
    </ScreenLayout>
  );
};
