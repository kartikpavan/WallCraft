import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { categories } from "@/constants/data";
import CategoryBadge from "./CategoryBadge";
import { widthPercentage } from "@/constants/theme";
import { useSearchStore } from "@/store/search.store";
import { useFilterStore } from "@/store/filter.store";
import { useDataStore } from "@/store/data.store";

const CategoryList = () => {
  const { clearSearchQuery } = useSearchStore((state) => state);
  const { setCategory, filters, category } = useFilterStore((state) => state);
  const { setImages, fetchData } = useDataStore((state) => state);
  const flatListRef = useRef<FlatList | null>(null);

  // CATEGORIES
  const handleSelectCategory = (category: string | null) => {
    clearSearchQuery();
    setCategory(category);
    setImages([]);
    fetchData({
      page: 1,
      append: false,
      category: category !== null ? category : "",
      ...filters,
    });
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const data = useMemo(() => {
    if (category === null) return categories;
    const selectedIndex = categories.indexOf(category);
    return [
      ...(selectedIndex !== -1 ? [categories[selectedIndex]] : []),
      ...(selectedIndex !== -1 ? categories.slice(0, selectedIndex) : categories),
      ...(selectedIndex !== -1 ? categories.slice(selectedIndex + 1) : []),
    ];
  }, [category]);

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
          selectedCategory={category}
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
