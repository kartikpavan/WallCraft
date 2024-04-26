import { StyleSheet, View } from "react-native";
import React from "react";
import { PixabayImage } from "@/types/types";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { heightPercentage, widthPercentage } from "@/constants/theme";

type ImageListProps = {
   images: PixabayImage[];
};

const ImageList = ({ images }: ImageListProps) => {
   return (
      <View style={styles.imagesContainer}>
         <MasonryFlashList
            contentContainerStyle={{ paddingHorizontal: widthPercentage(4) }}
            data={images}
            numColumns={2}
            renderItem={({ item, index }) => <ImageCard image={item} index={index} />}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={200}
         />
      </View>
   );
};

export default ImageList;

const styles = StyleSheet.create({
   imagesContainer: {
      minHeight: heightPercentage(100),
      width: widthPercentage(100),
      marginTop: 20,
   },
});