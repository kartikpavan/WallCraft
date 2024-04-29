import { Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { PixabayImage } from "@/types/types";
import { theme, widthPercentage } from "@/constants/theme";
import ImageModal from "./ImageModal";

interface ImageCardProps {
   image: PixabayImage;
   index: number;
}

const ImageCard = ({ image, index }: ImageCardProps) => {
   const [isModalVisible, setIsModalVisible] = useState(false);

   const onModalOpen = () => {
      setIsModalVisible(true);
   };

   const onModalClose = () => {
      setIsModalVisible(false);
   };

   // Adding margin to the right of the image if it is the last item in the current row
   const isLastItem = () => {
      return (index + 1) % 2 === 0;
   };

   const getImageHeight = () => {
      const getImageSize = () => {
         const { imageWidth, imageHeight } = image;
         if (imageWidth > imageHeight) {
            // landscape
            return 250;
         } else if (imageWidth < imageHeight) {
            // portrait
            return 300;
         } else {
            // square
            return 200;
         }
      };
      return { height: getImageSize() };
   };
   return (
      <>
         <Pressable style={[styles.wrapper, !isLastItem() && styles.spacing]} onPress={onModalOpen}>
            <Image
               source={{ uri: image?.webformatURL }}
               style={[styles.image, getImageHeight()]}
               transition={100}
            />
         </Pressable>
         <ImageModal isVisible={isModalVisible} image={image} onModalClose={onModalClose} />
      </>
   );
};

export default ImageCard;

const styles = StyleSheet.create({
   wrapper: {
      backgroundColor: theme.colors.backgroundMuted,
      borderRadius: 15,
      borderCurve: "continuous",
      overflow: "hidden",
      marginBottom: widthPercentage(4),
   },
   image: {
      width: "100%",
      height: 300,
      borderRadius: 10,
   },
   spacing: {
      marginRight: widthPercentage(2),
   },
});
