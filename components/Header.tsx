import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

export default function Header() {
  return (
    <View style={headerStyles.headerViewContainer}>
      <Image
        style={headerStyles.tinyLogo}
        source={require("../assets/images/favicon.png")}
      />
      <Text style={headerStyles.headerText}>Stoic Mind</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headerViewContainer: {
    // flex: 1,
    backgroundColor: "#181A20",
    // height: 80,
    position: "absolute",
    top: 0,
    paddingTop: 55,
    paddingBottom: 20,
    width: "100%",
    zIndex: 100,
    // paddingBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "white",
    borderWidth: 0.2,
  },
  headerText: {
    // marginLeft: 40,
    fontSize: 14,
    textAlign: "center",
    color: "#848E9C",
  },
  tinyLogo: {
    width: 25,
    height: 25,
    marginBottom: 5,
    // justifyContent: "center",
  },
});
