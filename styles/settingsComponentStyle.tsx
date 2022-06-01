import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: "30%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});

export const settingsContainerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
});

export const settingsRowChecklistStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  heading: { fontSize: 16, fontWeight: "500", color: "#EAECEF" },
  description: { fontSize: 14, fontWeight: "300", color: "#848E9C" },
  checkbox: {
    width: "20%",
    justifyContent: "center",
  },
});
