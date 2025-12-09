import React from "react";
import { StatusBar } from "expo-status-bar";
import { RouterProvider } from "./providers";

export const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <RouterProvider />
    </>
  );
};
