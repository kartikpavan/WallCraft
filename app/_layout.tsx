import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AppContextProvider } from "@/context/AppContext";

const RootLayout = () => {
   return (
      <AppContextProvider>
         <Stack>
            <Stack.Screen name="(welcomeScreen)/index" options={{ headerShown: false }} />
            <Stack.Screen name="home/index" options={{ headerShown: false }} />
         </Stack>
      </AppContextProvider>
   );
};

export default RootLayout;

const styles = StyleSheet.create({});
