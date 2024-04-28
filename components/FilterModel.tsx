import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { BottomSheetModal, BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { useAppContext } from "@/context/AppContext";
import { heightPercentage, theme, widthPercentage } from "@/constants/theme";
import { filterData } from "@/constants/data";

const FilterModel = () => {
   const { bottomSheetModalRef } = useAppContext();
   const snapPoints = useMemo(() => ["25%", "65%"], []);
   const [selectedFilters, setSelectedFilters] = useState({});

   const handleFilterSelect = (filterName: string, selectedItem: string) => {
      setSelectedFilters((prevFilters) => ({
         ...prevFilters,
         [filterName]: selectedItem,
      }));
   };

   const badgeStyle = (filterName: string, selectedItem: string) => {
      // @ts-ignore
      return selectedFilters[filterName] === selectedItem
         ? {
              backgroundColor: theme.colors.secondary,
           }
         : {
              backgroundColor: theme.colors.background,
           };
   };

   const textStyle = (filterName: string, selectedItem: string) => {
      // @ts-ignore
      return selectedFilters[filterName] === selectedItem
         ? {
              color: theme.colors.white,
           }
         : {
              color: theme.colors.text,
           };
   };

   const colorWrapperStyle = (filterName: string, selectedItem: string) => {
      // @ts-ignore
      return selectedFilters[filterName] === selectedItem
         ? {
              backgroundColor: selectedItem,
              borderWidth: 3,
              borderColor: theme.colors.secondary,
           }
         : {
              backgroundColor: selectedItem,
           };
   };

   console.log(selectedFilters);

   return (
      <BottomSheetModal
         ref={bottomSheetModalRef}
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
         )}>
         <BottomSheetView style={styles.mainContainer}>
            <View>
               {/* <Text style={styles.title}>Filters</Text> */}
               {/* Order */}
               <Text style={styles.subTitle}>Sort</Text>
               <View style={styles.flexContainer}>
                  {filterData.order.map((item, index) => (
                     <Pressable
                        key={index}
                        style={[styles.badge, badgeStyle("order", item)]}
                        onPress={() => handleFilterSelect("order", item)}>
                        <Text style={[styles.text, textStyle("order", item)]}>{item}</Text>
                     </Pressable>
                  ))}
               </View>
               {/* Orientation */}
               <Text style={styles.subTitle}>Orientation</Text>
               <View style={styles.flexContainer}>
                  {filterData.orientation.map((item, index) => (
                     <Pressable
                        key={index}
                        style={[styles.badge, badgeStyle("orientation", item)]}
                        onPress={() => handleFilterSelect("orientation", item)}>
                        <Text style={[styles.text, textStyle("orientation", item)]}>{item}</Text>
                     </Pressable>
                  ))}
               </View>
               {/* Image Type */}
               <Text style={styles.subTitle}>Image Type</Text>
               <View style={styles.flexContainer}>
                  {filterData.image_type.map((item, index) => (
                     <Pressable
                        key={index}
                        style={[styles.badge, badgeStyle("image_type", item)]}
                        onPress={() => handleFilterSelect("image_type", item)}>
                        <Text style={[styles.text, textStyle("image_type", item)]}>{item}</Text>
                     </Pressable>
                  ))}
               </View>
               {/* Colors */}
               <Text style={styles.subTitle}>Colors</Text>
               <View style={styles.flexContainer}>
                  {filterData.colors.map((item, index) => (
                     <Pressable
                        key={index}
                        style={[styles.colorWrapper, colorWrapperStyle("colors", item)]}
                        onPress={() => handleFilterSelect("colors", item)}>
                        <Text style={[styles.text, textStyle("colors", item)]}></Text>
                     </Pressable>
                  ))}
               </View>
               <View style={styles.btnContainer}>
                  <TouchableOpacity style={[styles.button, styles.resetButton]}>
                     <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.applyButton]}>
                     <Text style={styles.buttonText}>Apply</Text>
                  </TouchableOpacity>
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
   // title: {
   //    fontSize: theme.font.lg,
   //    fontFamily: "Inter",
   //    fontWeight: "700",
   //    color: theme.colors.secondary,
   //    marginBottom: 10,
   //    marginTop: 10,
   // },
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
