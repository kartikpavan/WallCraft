import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { categories } from "@/constants/data";
import CategoryBadge from "./CategoryBadge";
import { widthPercentage } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";

const CategoryList = () => {
   const { handleSelectCategory, selectedCategory } = useAppContext();
   const flatListRef = useRef<FlatList | null>(null);
   const scrollToTop = () => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
   };

   const data = useMemo(() => {
      if (selectedCategory === null) return categories;
      const selectedIndex = categories.indexOf(selectedCategory);
      return [
         ...(selectedIndex !== -1 ? [categories[selectedIndex]] : []),
         ...(selectedIndex !== -1 ? categories.slice(0, selectedIndex) : categories),
         ...(selectedIndex !== -1 ? categories.slice(selectedIndex + 1) : []),
      ];
   }, [selectedCategory]);

   useEffect(() => {
      scrollToTop();
   }, [data]);

   return (
      <FlatList
         ref={flatListRef}
         contentContainerStyle={styles.categoryContainer}
         data={data}
         keyExtractor={(item) => item}
         renderItem={({ item, index }) => (
            <CategoryBadge
               key={index}
               category={item}
               index={index}
               handleSelectCategory={handleSelectCategory}
               selectedCategory={selectedCategory}
            />
         )}
         horizontal
         showsHorizontalScrollIndicator={false}
      />
   );
};

export default CategoryList;

const styles = StyleSheet.create({
   categoryContainer: {
      paddingHorizontal: widthPercentage(4),
      marginTop: 20,
      gap: 20,
   },
});
