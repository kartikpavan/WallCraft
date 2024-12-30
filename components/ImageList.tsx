import { heightPercentage, widthPercentage } from "@/constants/theme";
import { useDataStore } from "@/store/data.store";
import { MasonryFlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import ImageCard from "./ImageCard";

const ImageList = () => {
  const { images } = useDataStore((state) => state);
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
