import { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
   const [fontsLoaded, fontError] = useFonts({
      Inter: require("../assets/fonts/Inter-Regular.ttf"),
      Skatone: require("../assets/fonts/Skatone.ttf"),
   });

   const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded || fontError) {
         await SplashScreen.hideAsync();
      }
   }, [fontsLoaded, fontError]);

   if (!fontsLoaded && !fontError) {
      return null;
   }

   return (
      <View style={styles.container} onLayout={onLayoutRootView}>
         <Text style={{ fontFamily: "Inter", fontSize: 30, fontWeight: "700" }}>Inter Regular</Text>
         <Text style={{ fontSize: 30, fontFamily: "Skatone" }}>Platform Default</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
