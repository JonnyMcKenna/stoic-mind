import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import data from "../quotes.json";

export const getDailyNotificationsToggle = async () => {
  try {
    const dailyNotificationToggle = await AsyncStorage.getItem(
      "@daily_notifications_toggle"
    );

    if (dailyNotificationToggle !== null) {
      return dailyNotificationToggle === "true";
    } else {
      return false;
    }
  } catch (e) {
    return false;
    // error reading value
  }
};

export const getNotificationDate = async () => {
  try {
    const notificationDate = await AsyncStorage.getItem("@notification_date");
    if (notificationDate !== null) {
      const parsedNotificationDate = new Date(notificationDate);
      return parsedNotificationDate;
    } else {
      return new Date("Sat Feb 26 2022 08:00:00 GMT+0000 (GMT)");
    }
  } catch (e) {
    // error reading value
  }
};

export const storeNotificationDateToAsyncStorage = async (currentDate: any) => {
  try {
    await AsyncStorage.setItem("@notification_date", currentDate.toString());
  } catch (e) {
    // saving error
  }
};

const getCurrentDate = () => {
  var currentDay = new Date().getDate().toString();
  var currentMonth = (new Date().getMonth() + 1).toString();
  var currentYear = new Date().getFullYear().toString();
  const concatDate = currentYear + currentMonth + currentDay;
  const currentDate = Number(concatDate);
  return currentDate;
};

const storeCurrentDayToAsyncStorageAndGetQuote = (
  currentDate: any,
  dailyQuote: any
) => {
  storeCurrentDayToAsyncStorage(currentDate);
  console.log(
    "storeCurrentDayToAsyncStorageAndGetQuote: " + JSON.stringify(dailyQuote)
  );

  return JSON.parse(dailyQuote);
};

const storeQuoteAndGetNewQuote = (currentDate: any) => {
  const retrievedQuotes = data.quotes;
  const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
  const newQuote = retrievedQuotes[randomIndex];
  storeQuoteToAsyncStorage(newQuote);
  storeCurrentDayToAsyncStorage(currentDate);
  console.log("newQuote: " + newQuote);
  return newQuote;
};

export const getDailyQuote = async () => {
  const dailyQuote = await AsyncStorage.getItem("@daily_quote");

  if (dailyQuote !== null) {
    const returnedQuote = await AsyncStorage.getItem("@past_day").then(
      (pastDay) => {
        console.log("pastDay: " + pastDay);
        if (pastDay !== null) {
          const currentDate = getCurrentDate();
          const pastDate = Number(JSON.parse(pastDay));

          const isNewDay = pastDate < currentDate;

          console.log("isNewDay: " + isNewDay);

          return isNewDay
            ? storeQuoteAndGetNewQuote(currentDate)
            : storeCurrentDayToAsyncStorageAndGetQuote(currentDate, dailyQuote);
        } else {
          const currentDate = getCurrentDate();
          return storeCurrentDayToAsyncStorageAndGetQuote(
            currentDate,
            dailyQuote
          );
        }
      }
    );
    return returnedQuote;
  } else {
    // If no quote is stored in async storage, store and return deafult quote
    const intitialQuote = {
      text: "Life is long if you know how to use it.",
      author: "Seneca",
    };
    storeQuoteToAsyncStorage(intitialQuote);
    const currentDate = getCurrentDate();
    storeCurrentDayToAsyncStorage(currentDate);
    return intitialQuote;
  }
};

export const scheduleNotification = async () => {
  // Cancel previous notification from async storage
  await Notifications.cancelAllScheduledNotificationsAsync();

  let minute = 0;
  let hour = 8;

  getNotificationDate()
    .then((updatedNotificationDate) => {
      if (updatedNotificationDate) {
        minute = Number(updatedNotificationDate.getMinutes());
        hour = Number(updatedNotificationDate.getHours());
      }
    })
    .then(() => {
      const schedulingOptions = {
        content: {
          title: "Stoic Mind",
          body: "You have a new stoic quote of the day!",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          hour: hour,
          minute: minute,
          repeats: true,
        },
      };
      Notifications.scheduleNotificationAsync(schedulingOptions);

      Notifications.addNotificationResponseReceivedListener((response) => {
        //TODO: might need to add code to open app when this is clicked?
      });
    });
};

export const storeQuoteToAsyncStorage = async (newQuote?: any) => {
  try {
    // Store the new quote in async storage
    await AsyncStorage.setItem("@daily_quote", JSON.stringify(newQuote));
  } catch (e) {
    // saving error
  }
};

export const storeCurrentDayToAsyncStorage = async (currentDay: number) => {
  try {
    await AsyncStorage.setItem(
      "@past_day",
      JSON.stringify(JSON.stringify(currentDay))
    );
  } catch (e) {
    // saving error
  }
};
