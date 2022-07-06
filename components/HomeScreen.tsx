import React, { useEffect, useState } from "react";
import { ScrollView, Animated } from "react-native";
import NewButton from "./NewButton";
import { Text, View } from "./Themed";
import {
  getDailyQuote,
  scheduleNotification,
  storeQuoteToAsyncStorage,
} from "./QuoteScreenAsyncStorage";
import { QuoteProps } from "../types/genericTypes";
import { homeScreenStyles } from "../styles/homeScreen";
import data from "../quotes.json";
import "./QuoteScreenAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeAnimQuote] = useState(new Animated.Value(0));
  const [quote, setQuote] = useState<QuoteProps>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(fadeAnimQuote, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    getDailyQuote().then((dailyQuote: any) => {
      if (dailyQuote.text !== quote?.text) {
        setQuote(dailyQuote);
      }
    });
  }, []);

  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("@daily_notifications_toggle", "true");
        scheduleNotification();
        AsyncStorage.setItem("alreadyLaunched", "true"); // No need to wait for `setItem` to finish
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
  }, [isFirstLaunch]);

  // Get, set and store new quote to async storage
  function updateQuote() {
    Animated.timing(fadeAnimQuote, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    const newQuote = retrievedQuotes[randomIndex];
    setQuote(newQuote);
    storeQuoteToAsyncStorage(newQuote);
    Animated.timing(fadeAnimQuote, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView
        style={homeScreenStyles.scrollViewStyle}
        persistentScrollbar={true}
      >
        <View style={homeScreenStyles.container}>
          {quote && (
            <Animated.View
              style={{
                opacity: fadeAnimQuote,
              }}
            >
              <Text style={homeScreenStyles.quoteText}>"{quote.text}"</Text>
              <Text style={homeScreenStyles.quoteAuthor}>- {quote.author}</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
      <View style={homeScreenStyles.buttonViewContainer}>
        <NewButton onPress={updateQuote} title="New Quote" />
      </View>
    </Animated.View>
  );
}
