import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsRowComponent = ({
  heading,
  description,
}: {
  heading: any;
  description: any;
}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={containerStyle.rowContainer}>
      <View>
        <Text style={containerStyle.heading}>{heading}</Text>
        <Text style={containerStyle.description}>{description}</Text>
      </View>
    </View>
  );
};

const containerStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  heading: { fontSize: 16, fontWeight: "500", color: "#EAECEF" },
  description: { fontSize: 14, fontWeight: "300", color: "#848E9C" },
});

export default SettingsRowComponent;
