import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View as ThemeView } from "../components/Themed";
import SettingsRowComponent from "./SettingsRowComponent";
import * as Notifications from "expo-notifications";
import {
  getDailyNotificationsToggle,
  getNotificationDate,
  scheduleNotification,
  storeNotificationDateToAsyncStorage,
} from "./QuoteScreenAsyncStorage";
import {
  settingsContainerStyle,
  settingsRowChecklistStyle,
  settingsStyles,
} from "../styles/settingsComponentStyle";

const SettingsComponent = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
    getNotificationDate().then((parsedNotificationDate) => {
      if (parsedNotificationDate) {
        setDate(parsedNotificationDate);
      }
    });

    getDailyNotificationsToggle().then((dailyNotificationToggleValue) => {
      setSelection(dailyNotificationToggleValue);
    });
  }, []);

  const [date, setDate] = useState(new Date(1598051757900));
  const [isSelected, setSelection] = useState(true);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    storeNotificationDateToAsyncStorage(currentDate).then(() => {
      scheduleNotification();
    });
    setDate(currentDate);
  };

  const openDateTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "time",
      is24Hour: true,
    });
  };

  const onDailyChange = async (isSelected: any, date: any) => {
    if (isSelected) {
      //if isSelected is true then this section is open but about to close
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    if (!isSelected) {
      //if isSelected is false then this section is closed but about to open
      // cancelAllScheduledNotificationsAsync is already called in scheduleNotification which is why we don't trigger cancelAllScheduledNotificationsAsync twice
      scheduleNotification();
    }

    const isSelectedToggle = !isSelected;
    await AsyncStorage.setItem(
      "@daily_notifications_toggle",
      isSelectedToggle.toString()
    );

    setSelection(!isSelected);
  };

  function addZeroBefore(n: any) {
    return (n < 10 ? "0" : "") + n;
  }

  var minutes = addZeroBefore(date.getMinutes());
  var hours = addZeroBefore(date.getHours());

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView>
        <View
          style={[
            settingsStyles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
                marginTop: 0,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Notifications
            </Text>
          </View>

          <TouchableOpacity onPress={() => setSelection(!isSelected)}>
            <View style={settingsContainerStyle.rowContainer}>
              <View style={{ width: "80%" }}>
                <Text style={settingsRowChecklistStyle.heading}>{"Daily"}</Text>
                <Text style={settingsRowChecklistStyle.description}>
                  {"Be notified daily by a randomly selected quote."}
                </Text>
              </View>
              <View style={settingsRowChecklistStyle.checkbox}>
                <BouncyCheckbox
                  isChecked={isSelected}
                  size={25}
                  style={{ marginLeft: 30, padding: 0 }}
                  fillColor="#181A20"
                  disableBuiltInState
                  unfillColor="#EAECEF"
                  iconStyle={{ borderColor: "#EAECEF" }}
                  onPress={() => onDailyChange(isSelected, date)}
                />
              </View>
            </View>
          </TouchableOpacity>

          {isSelected && (
            <TouchableOpacity onPress={() => openDateTimePickerAndroid()}>
              <SettingsRowComponent
                heading={"Delivery Time"}
                description={
                  "When do you want your daily dose? Currently at " +
                  hours +
                  ":" +
                  minutes
                }
              />
            </TouchableOpacity>
          )}

          <ThemeView
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />

          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
                marginTop: 0,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              The Stoic
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://paypal.me/jonnycmckenna?country.x=GB&locale.x=en_GB"
              ).catch((err) => console.error("Error", err))
            }
          >
            <SettingsRowComponent
              heading={"Support Development"}
              description={
                "If you enjoy Stoic Mind, please consider supporting its development with a coffee. Caffeine === Code."
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("mailto:jonathanmckenna123abc@hotmail.com").catch(
                (err) => console.error("Error", err)
              )
            }
          >
            <SettingsRowComponent
              heading={"Contact"}
              description={"Report bugs or request new features."}
            />
          </TouchableOpacity>

          <ThemeView
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />

          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
                marginTop: 0,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Connect
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.instagram.com/jonny__mckenna/"
              ).catch((err) => console.error("Error", err))
            }
          >
            <View style={{ marginTop: 30, flexDirection: "row" }}>
              <TabBarIcon name="instagram" color={"white"} />

              <View style={{ flexDirection: "row", marginLeft: 30 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#EAECEF",
                    }}
                  >
                    {"Instagram"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "300",
                      color: "#848E9C",
                    }}
                  >
                    {"@jonny__mckenna"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.jonnymckenna.com/").catch((err) =>
                console.error("Error", err)
              )
            }
          >
            <View style={{ marginTop: 30, flexDirection: "row" }}>
              <TabBarIcon name="laptop" color={"white"} />

              <View style={{ flexDirection: "row", marginLeft: 30 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#EAECEF",
                    }}
                  >
                    {"Website"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "300",
                      color: "#848E9C",
                    }}
                  >
                    {"www.jonnymckenna.com"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <ThemeView
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: 0 }} {...props} />;
}

export default SettingsComponent;
