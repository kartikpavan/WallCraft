import { theme } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

interface CategoryBadgeProps {
  category: string;
  index: number;
  handleSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const CategoryBadge = ({
  category,
  index,
  handleSelectCategory,
  selectedCategory,
}: CategoryBadgeProps) => {
  return (
    <Animated.View
      entering={
        FadeInRight.delay(index * 50)
          .duration(400)
          .damping(0.5) // damping tells how quickly animation will slow down
      }
    >
      <Pressable
        style={[
          styles.badge,
          {
            backgroundColor:
              selectedCategory === category ? theme.colors.primary : theme.colors.backgroundMuted,
          },
        ]}
        onPress={() => handleSelectCategory(category === selectedCategory ? "" : category)}
      >
        <Text
          style={[
            styles.text,
            { color: category === selectedCategory ? theme.colors.white : theme.colors.text },
          ]}
        >
          {category}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default CategoryBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundMuted,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.font.xs,
    fontFamily: "Inter",
    textTransform: "uppercase",
  },
});
