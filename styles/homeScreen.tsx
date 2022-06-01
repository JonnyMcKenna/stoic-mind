import { StyleSheet } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/colors";

export const homeScreenStyles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    backgroundColor: "#181A20",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  container: {
    marginTop: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181A20",
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 21,
    textAlign: "left",
    color: "#EAECEF",
  },
  quoteAuthor: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    fontWeight: "600",
    color: "#848E9C",
    textAlign: "left",
  },
  scrollViewStyle: {
    flexGrow: 0,
    backgroundColor: "#181A20",
  },
  buttonViewContainer: {
    flex: 1,
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
