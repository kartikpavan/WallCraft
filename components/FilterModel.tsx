import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { theme, widthPercentage } from "@/constants/theme";
import { filterData } from "@/constants/data";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";
import { useFilterStore } from "@/store/filter.store";

type FilterModelProps = {
  filterRef: React.RefObject<BottomSheetModal>;
};

const FilterModel = ({ filterRef }: FilterModelProps) => {
  const { filters, setFilters, handleClearFiltersAndFetchData, handleApplyFiltersAndFetchData } =
    useFilterStore((state) => state);

  const snapPoints = useMemo(() => ["25%", "65%"], []);

  const badgeStyle = (filterName: string, selectedItem: string) => {
    return filters[filterName] === selectedItem
      ? { backgroundColor: theme.colors.primary }
      : { backgroundColor: theme.colors.background };
  };

  const textStyle = (filterName: string, selectedItem: string) => {
    return filters[filterName] === selectedItem
      ? { color: theme.colors.white }
      : { color: theme.colors.text };
  };

  const colorWrapperStyle = (filterName: string, selectedItem: string) => {
    return filters[filterName] === selectedItem
      ? {
          backgroundColor: selectedItem,
          borderWidth: 3,
          borderColor: theme.colors.primary,
        }
      : { backgroundColor: selectedItem };
  };

  return (
    <BottomSheetModal
      ref={filterRef}
      index={1}
      snapPoints={snapPoints}
      handleStyle={{
        backgroundColor: theme.colors.backgroundMuted,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.background,
      }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.secondary }}
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
      )}
    >
      <BottomSheetView style={styles.mainContainer}>
        <View>
          {/* Order */}
          <Animated.Text entering={FadeInDown.delay(200).damping(10)} style={styles.subTitle}>
            Sort
          </Animated.Text>
          <View style={styles.flexContainer}>
            {filterData.order.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.badge, badgeStyle("order", item)]}
                onPress={() => setFilters({ ...filters, ["order"]: item })}
              >
                <Animated.Text
                  entering={FadeInDown.delay(index * 100).damping(10)}
                  style={[styles.text, textStyle("order", item)]}
                >
                  {item}
                </Animated.Text>
              </Pressable>
            ))}
          </View>
          {/* Orientation */}
          <Animated.Text style={styles.subTitle} entering={FadeInDown.delay(200).damping(10)}>
            Orientation
          </Animated.Text>
          <View style={styles.flexContainer}>
            {filterData.orientation.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.badge, badgeStyle("orientation", item)]}
                onPress={() => setFilters({ ...filters, ["orientation"]: item })}
              >
                <Animated.Text
                  entering={FadeInDown.delay(index * 100).damping(10)}
                  style={[styles.text, textStyle("orientation", item)]}
                >
                  {item}
                </Animated.Text>
              </Pressable>
            ))}
          </View>
          {/* Image Type */}
          <Animated.Text style={styles.subTitle} entering={FadeInDown.delay(200).damping(10)}>
            Image Type
          </Animated.Text>
          <View style={styles.flexContainer}>
            {filterData.image_type.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.badge, badgeStyle("image_type", item)]}
                onPress={() => setFilters({ ...filters, ["image_type"]: item })}
              >
                <Animated.Text
                  entering={FadeInDown.delay(index * 100).damping(10)}
                  style={[styles.text, textStyle("image_type", item)]}
                >
                  {item}
                </Animated.Text>
              </Pressable>
            ))}
          </View>
          {/* Colors */}
          <Animated.Text style={styles.subTitle} entering={FadeInDown.delay(200).damping(10)}>
            Colors
          </Animated.Text>
          <View style={styles.flexContainer}>
            {filterData.colors.map((item, index) => (
              <Animated.View entering={FadeInDown.delay(index * 100 + 100).damping(10)} key={index}>
                <Pressable
                  style={[styles.colorWrapper, colorWrapperStyle("colors", item)]}
                  onPress={() => setFilters({ ...filters, ["colors"]: item })}
                >
                  <Animated.Text
                    entering={FadeInDown.delay(index * 100).damping(10)}
                    style={[styles.text, textStyle("colors", item)]}
                  ></Animated.Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
          <View style={styles.btnContainer}>
            <Animated.View entering={FlipInEasyX.delay(1300).duration(400)}>
              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={() => handleClearFiltersAndFetchData(filterRef)}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FlipInEasyX.delay(1300).duration(400)}>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => handleApplyFiltersAndFetchData(filterRef)}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FilterModel;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundMuted,
    paddingHorizontal: widthPercentage(4),
  },
  subTitle: {
    fontSize: theme.font.sm,
    fontFamily: "Inter",
    color: theme.colors.text,
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: { fontSize: theme.font.xs },
  colorWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: widthPercentage(15),
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentage(40),
  },
  resetButton: {
    backgroundColor: theme.colors.background,
  },
  applyButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
