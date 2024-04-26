import {
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   TouchableOpacityBase,
   View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { theme, widthPercentage } from "@/constants/theme";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryList from "@/components/CategoryList";
import ImageList from "@/components/ImageList";
import { fetchImages } from "@/api";
import { PixabayImage } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "@/hooks/useDebounce";

const HomeScreen = () => {
   const [searchText, setSearchText] = useState<string>("");
   const [selectedCategory, setSlelectedCategory] = useState<string>("");
   const [images, setImages] = useState<PixabayImage[]>([]);
   const [page, setPage] = useState(1);
   const debouncedValue = useDebounce(searchText, 600);

   const fetchData = async (page: number, append: boolean = false, query: string = "") => {
      const response = await fetchImages({
         category: selectedCategory,
         searchQuery: query,
         order: "popular",
         perPage: 25,
         page: 1,
         append: true,
      });
      if (response?.success && response?.data.hits) {
         if (append) {
            setImages([...images, ...response.data.hits]);
         } else {
            setImages(response.data.hits);
         }
      }
   };

   const handleSearch = () => {
      if (debouncedValue.length > 2) {
         setPage(1);
         setImages([]);
         fetchData(page, false, debouncedValue);
      }
      if (debouncedValue.length === 0) {
         setPage(1);
         setImages([]);
         fetchData(page, false);
      }
   };

   const handleSelectCategory = (category: string) => {
      setSlelectedCategory(category);
   };

   const clearSearch = () => {
      setSearchText("");
   };

   useEffect(() => {
      fetchData(1, false);
   }, []);

   const { top } = useSafeAreaInsets();
   const paddingTop = top > 0 ? top + 20 : 0;
   return (
      <View style={[styles.mainContainer, { paddingTop }]}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.title}>WallCraft</Text>
            <Pressable>
               <MaterialIcon name="menu-open" size={30} color={theme.colors.text} />
            </Pressable>
         </View>
         {/* SearchBar */}
         <View>
            <View style={styles.searchContainer}>
               <Ionicons name="search" size={24} color="#9fb9d0" style={styles.icon} />
               <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search..."
                  placeholderTextColor="#9fb9d0"
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                  autoCorrect={true}
               />
               {searchText ? (
                  <TouchableOpacity onPress={clearSearch} style={styles.icon}>
                     <Ionicons name="close" size={24} color="#9fb9d0" />
                  </TouchableOpacity>
               ) : null}
            </View>
         </View>
         {/* Category List */}
         <View>
            <CategoryList
               handleSelectCategory={handleSelectCategory}
               selectedCategory={selectedCategory}
            />
         </View>
         <View>
            {/* Images List */}
            {images.length > 0 ? <ImageList images={images} /> : null}
         </View>
      </View>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
   },
   header: {
      paddingHorizontal: widthPercentage(4),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   title: {
      textAlign: "center",
      fontFamily: "Skatone",
      textTransform: "uppercase",
      fontSize: 28,
      color: theme.colors.primary,
   },
   searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.backgroundMuted,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginHorizontal: widthPercentage(4),
      marginTop: 20,
   },
   input: {
      flex: 1,
      color: theme.colors.textMuted,
      paddingLeft: 10,
      fontSize: theme.font.md,
   },
   icon: {
      padding: 10,
   },
});
