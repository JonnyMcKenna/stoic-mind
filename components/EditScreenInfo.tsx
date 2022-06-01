import React, { useEffect, useState } from "react";
import { ScrollView, Animated } from "react-native";
import NewButton from "./NewButton";
import { Text, View } from "./Themed";
import * as TaskManager from "expo-task-manager";
import {
  BACKGROUND_FETCH_TASK,
  getDailyQuote,
  registerBackgroundFetchAsync,
  storeQuoteToAsyncStorage,
  unregisterBackgroundFetchAsync,
} from "./QuoteScreenAsyncStorage";
import { QuoteProps } from "../types/genericTypes";
import { homeScreenStyles } from "../styles/homeScreen";
import data from "../quotes.json";
import "./QuoteScreenAsyncStorage";

export default function EditScreenInfo() {
  // On Load - Ensure that background fetch is in sync and get todays quote

  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeAnimQuote] = useState(new Animated.Value(0));

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

    checkStatusAsync();
    toggleFetchTask();
    getDailyQuote().then((dailyQuote: any) => {
      setQuote(dailyQuote);
    });
  }, []);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [quote, setQuote] = useState<QuoteProps>();

  const checkStatusAsync = async () => {
    // Check if background fetch is registered and syced
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setIsRegistered(isRegistered);
  };

  // Ensure background fetch is registered
  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

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
      // easing: Easing.bounce,
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
