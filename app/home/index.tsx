import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/theme";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryList from "@/components/CategoryList";
import ImageList from "@/components/ImageList";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./home.styles";
import { useAppContext } from "@/context/AppContext";
import FilterModel from "@/components/FilterModel";
import { useRef, useState } from "react";

const HomeScreen = () => {
   const {
      clearSearch,
      images,
      searchText,
      setSearchText,
      handlePresentModalPress,
      selectedFilters,
      handleScroll,
   } = useAppContext();
   const scrollRef = useRef<ScrollView | null>(null);

   const handleScrollToTop = () => {
      scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
   };

   const { top } = useSafeAreaInsets();
   const paddingTop = top > 0 ? top + 20 : 0;
   return (
      <View style={[styles.mainContainer, { paddingTop }]}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.title} onPress={handleScrollToTop}>
               WallCraft
            </Text>
            <Pressable onPress={handlePresentModalPress} style={{ position: "relative" }}>
               {Object.keys(selectedFilters).length > 0 && <View style={styles.indicator} />}
               <MaterialIcon name="filter-list" size={30} color={theme.colors.text} />
            </Pressable>
         </View>
         <ScrollView onScroll={handleScroll} scrollEventThrottle={5} ref={scrollRef}>
            {/* SearchBar */}
            <View style={styles.searchContainer}>
               <Ionicons name="search" size={24} color="#9fb9d0" style={styles.icon} />
               <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search..."
                  placeholderTextColor="#9fb9d0"
                  autoCorrect={true}
               />
               {searchText ? (
                  <TouchableOpacity onPress={clearSearch} style={styles.icon}>
                     <Ionicons name="close" size={24} color="#9fb9d0" />
                  </TouchableOpacity>
               ) : null}
            </View>
            {/* Category List */}
            <View>
               <CategoryList />
            </View>
            {/* Images List */}
            {images.length > 0 ? <ImageList /> : null}
         </ScrollView>
         {/* Filter Bottom Sheet*/}
         <FilterModel />
      </View>
   );
};

export default HomeScreen;
