import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useAppContext } from "@/context/AppContext";

const FilterModel = () => {
   const { bottomSheetModalRef } = useAppContext();
   const snapPoints = useMemo(() => ["25%", "50%"], []);
   return (
      <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
         <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
         </BottomSheetView>
      </BottomSheetModal>
   );
};

export default FilterModel;

const styles = StyleSheet.create({
   contentContainer: {
      flex: 1,
   },
});
