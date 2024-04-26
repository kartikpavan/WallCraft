import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const widthPercentage = (percentage: number): number => {
   return (percentage * width) / 100;
};

export const heightPercentage = (percentage: number): number => {
   return (percentage * height) / 100;
};

export const theme = {
   colors: {
      white: "#fff",
      primary: "#	",
      secondary: "#fd6f9c",
      accent: "#b387fa",
      info: "#89e0eb",
      text: "#9fb9d0",
      textMuted: "#94a0a9",
      background: "#121c22",
      backgroundMuted: "#1b262c",
      error: "#ffbbbd",
   },
   font: { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 },
};
