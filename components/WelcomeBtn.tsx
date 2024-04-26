import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme, widthPercentage } from "@/constants/theme";

interface ButtonProps {
   onPress: () => void;
   title: string;
}

const WelcomeBtn: React.FC<ButtonProps> = ({ onPress, title }) => {
   return (
      <TouchableOpacity onPress={onPress}>
         <LinearGradient
            colors={["#b387fa", "#89e0eb"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.text}>{title}</Text>
         </LinearGradient>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      width: widthPercentage(80),
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      color: "#fff", // Change text color to white
      fontSize: theme.font.lg,
      fontFamily: "Inter",
      fontWeight: "700",
   },
});

export default WelcomeBtn;
