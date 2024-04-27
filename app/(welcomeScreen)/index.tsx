import { useCallback } from "react";
import { Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import WelcomeBtn from "@/components/WelcomeBtn";
import Animated, { FadeInUp, FlipInEasyX } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { styles } from "./welcome.styles";
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
   const router = useRouter();
   const [fontsLoaded, fontError] = useFonts({
      Inter: require("../../assets/fonts/Inter-Regular.ttf"),
      Skatone: require("../../assets/fonts/Skatone.ttf"),
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
         <StatusBar style="light" />
         <Image
            source={require("../../assets/images/welcome.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
         />
         <View style={styles.contentContainer}>
            <View style={styles.heroContainer}>
               <Animated.Image
                  entering={FadeInUp.duration(500)}
                  source={require("../../assets/images/icon3.png")}
                  style={styles.logo}
                  resizeMode="contain"
               />
               <View style={{ marginTop: 20 }}>
                  <Animated.Text entering={FadeInUp.duration(600)} style={styles.title}>
                     Welcome to <Text style={{ fontFamily: "Skatone" }}>WallCraft</Text>
                  </Animated.Text>
                  <Animated.Text entering={FadeInUp.duration(600)} style={styles.subTitle}>
                     Your new favorite wallpaper app.
                  </Animated.Text>
               </View>
            </View>
            <Animated.View
               entering={FlipInEasyX.delay(500).duration(500)}
               style={styles.btnContainer}>
               <WelcomeBtn title="Get Started" onPress={() => router.push("/home/")} />
            </Animated.View>
         </View>
         {/* <Text style={{ fontFamily: "Inter", fontSize: 30, fontWeight: "700" }}>Inter Regular</Text>
         <Text style={{ fontSize: 30, fontFamily: "Skatone" }}>Platform Default</Text> */}
      </View>
   );
}
