// App.js
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider } from "./src/global/context/AuthenticationContext";
import MainLayout from "./src/components/layout/Main";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
      <Toast position="top" />
    </NavigationContainer>
  );
}
