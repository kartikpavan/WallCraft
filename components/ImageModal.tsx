import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PixabayImage } from "@/types/types";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useState } from "react";
import { heightPercentage, theme, widthPercentage } from "@/constants/theme";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

type ImageModalProps = {
   isVisible: boolean;
   image: PixabayImage;
   onModalClose: () => void;
};

const ImageModal = ({ image, isVisible, onModalClose }: ImageModalProps) => {
   const [status, setStatus] = useState("");
   const fileName = image?.previewURL.split("/").pop();
   const imageUrl = image?.webformatURL;
   const temporaryFilePath = `${FileSystem.cacheDirectory}${fileName}`;
   const finalFilePath = `${FileSystem.documentDirectory}${fileName}`;

   const getSize = () => {
      const aspectRatio = image?.imageWidth / image?.imageHeight;
      let height = widthPercentage(92) / aspectRatio;
      let width = widthPercentage(92);
      // Potrait
      if (aspectRatio < 1) width = height * aspectRatio;
      return {
         height: height,
         width: width,
      };
   };

   const onLoad = () => {
      setStatus("");
   };

   const handleDownloadImage = async () => {
      setStatus("downloading");
      const uri = await downloadFile();
      if (uri) {
         setStatus("downloaded");
      }
   };

   const downloadFile = async () => {
      try {
         // Download the file to the temporary location
         const { uri: temporaryUri } = await FileSystem.downloadAsync(imageUrl, temporaryFilePath);
         // Move the file to the Downloads directory
         await FileSystem.moveAsync({
            from: temporaryUri,
            to: finalFilePath,
         });
         // Save to Media Library
         await MediaLibrary.saveToLibraryAsync(finalFilePath);
         console.log("File saved to Downloads:", finalFilePath);
         Alert.alert("Success", "File saved to Downloads");
         setStatus("");
         return temporaryUri;
      } catch (error) {
         if (error instanceof Error) {
            setStatus("");
            console.log(error.message);
            Alert.alert("Image", error.message);
            return null;
         }
      }
   };

   const handleShareImage = async () => {
      setStatus("sharing");
      const uri = await downloadFile();
      if (uri) {
         await Sharing.shareAsync(uri);
         setStatus("");
      }
   };

   return (
      <Modal animationType="fade" transparent={true} visible={isVisible}>
         <BlurView
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
            intensity={30}
            style={styles.contentWrap}>
            <View style={styles.modalContent}>
               <Animated.View entering={FadeInUp.duration(600).damping(11)}>
                  <Image
                     onLoad={onLoad}
                     transition={100}
                     source={image.webformatURL}
                     style={[styles.image, getSize()]}
                  />
               </Animated.View>
               <View style={styles.buttons}>
                  <Animated.View entering={FadeInDown.springify()}>
                     <Pressable onPress={onModalClose} style={styles.button}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                     </Pressable>
                  </Animated.View>
                  <Animated.View entering={FadeInDown.springify().delay(200)}>
                     {status === "downloading" ? (
                        <Pressable onPress={handleDownloadImage} style={styles.button}>
                           <ActivityIndicator size={"small"} color={theme.colors.primary} />
                        </Pressable>
                     ) : (
                        <Pressable onPress={handleDownloadImage} style={styles.button}>
                           <MaterialIcons name="download" color="#fff" size={22} />
                        </Pressable>
                     )}
                  </Animated.View>
                  <Animated.View entering={FadeInDown.springify().delay(400)}>
                     {status === "sharing" ? (
                        <Pressable onPress={handleDownloadImage} style={styles.button}>
                           <ActivityIndicator size={"small"} color={theme.colors.primary} />
                        </Pressable>
                     ) : (
                        <Pressable onPress={handleShareImage} style={styles.button}>
                           <MaterialIcons name="share" color="#fff" size={22} />
                        </Pressable>
                     )}
                  </Animated.View>
               </View>
            </View>
         </BlurView>
      </Modal>
   );
};

export default ImageModal;

const styles = StyleSheet.create({
   contentWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: widthPercentage(100),
   },
   modalContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: widthPercentage(100),
   },
   image: {
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderColor: "rgba(0, 0, 0, 0.1)",
   },
   buttons: {
      width: widthPercentage(100),
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 30,
   },
   button: {
      height: heightPercentage(6),
      width: widthPercentage(15),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 134, 91, 0.5)",
      borderRadius: 15,
      borderCurve: "continuous",
   },
});
