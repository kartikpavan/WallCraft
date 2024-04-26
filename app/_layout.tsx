import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
   return (
      <Stack>
         <Stack.Screen name="(welcomeScreen)/index" options={{ headerShown: false }} />
         <Stack.Screen name="home/index" options={{ headerShown: false }} />
      </Stack>
   );
};

export default RootLayout;

const styles = StyleSheet.create({});
