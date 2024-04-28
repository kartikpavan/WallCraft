import { Stack } from "expo-router";
import { AppContextProvider } from "@/context/AppContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <AppContextProvider>
            <BottomSheetModalProvider>
               <Stack>
                  <Stack.Screen name="(welcomeScreen)/index" options={{ headerShown: false }} />
                  <Stack.Screen name="home/index" options={{ headerShown: false }} />
               </Stack>
            </BottomSheetModalProvider>
         </AppContextProvider>
      </GestureHandlerRootView>
   );
};

export default RootLayout;
