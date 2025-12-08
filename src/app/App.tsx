import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RouterProvider } from "./providers";

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RouterProvider />
    </SafeAreaProvider>
  );
};
