import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (percentage: number): number => {
   return (percentage * width) / 100;
};

export const heightPercentage = (percentage: number): number => {
   return (percentage * height) / 100;
};

export const theme = {
   colors: {
      primary: "#ff865b",
      secondary: "#fd6f9c",
      accent: "#b387fa",
      info: "#89e0eb",
      text: "#9fb9d0",
      textMuted: "#94a0a9",
      background: "#121c22",
      backgroundMuted: "#1b262c",
      error: "#ffbbbd",
   },
   font: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
};
