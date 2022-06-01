import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Header from "../components/Header";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Header />
      <EditScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181A20",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EAECEF",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
