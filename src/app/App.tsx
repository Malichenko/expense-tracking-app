import React from "react";
import { StatusBar } from "expo-status-bar";

import { setupAuthHandlers } from "./lib";
import { RouterProvider } from "./providers";

setupAuthHandlers();

export const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <RouterProvider />
    </>
  );
};
