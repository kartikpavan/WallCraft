import { heightPercentage, theme, widthPercentage } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    width: widthPercentage(100),
    height: heightPercentage(100),
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroContainer: {
    width: widthPercentage(100),
    height: heightPercentage(80),
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: heightPercentage(20),
    width: widthPercentage(30),
  },
  title: {
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: theme.font.xl,
    color: theme.colors.white,
  },
  subTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: theme.font.sm,
    color: theme.colors.white,
  },
  btnContainer: {
    width: widthPercentage(100),
    height: heightPercentage(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
