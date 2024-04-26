import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { categories } from "@/constants/data";
import CategoryBadge from "./CategoryBadge";
import { widthPercentage } from "@/constants/theme";

interface CategoryBadgeProps {
   handleSelectCategory: (category: string) => void;
   selectedCategory: string | null;
}

const CategoryList = ({ handleSelectCategory, selectedCategory }: CategoryBadgeProps) => {
   return (
      <FlatList
         contentContainerStyle={styles.categoryContainer}
         data={categories}
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
