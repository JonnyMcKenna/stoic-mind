import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export const BACKGROUND_FETCH_TASK = "background-fetch";
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

export const getDailyQuote = async () => {
  // Get quote from async storage
  const dailyQuote = await AsyncStorage.getItem("@daily_quote");

  if (dailyQuote !== null) {
    // If quote is stored in async storage return it
    return JSON.parse(dailyQuote);
  } else {
    // If no quote is stored in async storage, store and return deafult quote
    storeQuoteToAsyncStorage({
      text: "Life is long if you know how to use it.",
      author: "Seneca",
    });

    return {
      text: "Life is long if you know how to use it.",
      author: "Seneca",
    };
  }
};

export const scheduleNotification = async (newQuote?: any) => {
  // Cancel previous notification from async storage
  await Notifications.cancelAllScheduledNotificationsAsync();

  let minute = 0;
  let hour = 8;

  // TODO: Can maybe pass this in?
  getNotificationDate()
    .then((updatedNotificationDate) => {
      if (updatedNotificationDate) {
        minute = Number(updatedNotificationDate.getMinutes());
        hour = Number(updatedNotificationDate.getHours());
      }
    })
    .then(() => {
      let dailyQuoteMessage;
      let dailyQuoteAuthor;

      if (newQuote !== undefined || null) {
        // If we have the newQuote use that
        dailyQuoteMessage = newQuote.text;
        dailyQuoteAuthor = newQuote.author;

        //TODO: This code is being duplicated here and below - refactor this.
        const schedulingOptions = {
          content: {
            title: "Stoic Mind",
            body: dailyQuoteMessage + " - " + dailyQuoteAuthor,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            // color: "blue",
          },
          trigger: {
            // seconds: 3,
            hour: hour,
            minute: minute,
            repeats: true,
          },
        };
        Notifications.scheduleNotificationAsync(schedulingOptions);
      } else {
        // If we don't have newQuote then get it from async storage
        // TODO: Can remove this and always pass in 'newQuote' in props
        getDailyQuote().then((dailyQuote: any) => {
          dailyQuoteMessage = dailyQuote.text;
          dailyQuoteAuthor = dailyQuote.author;

          //TODO: This code is being duplicated here and above - refactor this.
          const schedulingOptions = {
            content: {
              title: "Stoic Mind",
              body: dailyQuoteMessage + " - " + dailyQuoteAuthor,
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
              // color: "blue",
            },
            trigger: {
              // seconds: 3,
              hour: hour,
              minute: minute,
              repeats: true,
            },
          };
          Notifications.scheduleNotificationAsync(schedulingOptions);
        });
      }
    });
};

export const storeQuoteToAsyncStorage = async (newQuote?: any) => {
  // If newQuote isn't passed in, generate and return a new one
  if (!newQuote || newQuote === null) {
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    newQuote = retrievedQuotes[randomIndex];
  }

  try {
    // Store the new quote in async storage
    await AsyncStorage.setItem("@daily_quote", JSON.stringify(newQuote)).then(
      () => {
        // Schedule notification with the new quote
        scheduleNotification(newQuote);
      }
    );
  } catch (e) {
    // saving error
  }
};

const storeCurrentDayToAsyncStorage = async (currentDay: number) => {
  try {
    await AsyncStorage.setItem(
      "@past_day",
      JSON.stringify(JSON.stringify(currentDay))
    );
  } catch (e) {
    // saving error
  }
};

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Every day change the quote and save to async storage

  var currentDay = new Date().getDay;
  const pastDay = await AsyncStorage.getItem("@past_day");

  if (pastDay !== null) {
    // If we are in the next day, store a new quote and update the current day in Async Storage
    if (Number(pastDay) < Number(currentDay)) {
      //get new quote
      storeQuoteToAsyncStorage();
      storeCurrentDayToAsyncStorage(Number(currentDay));
    }
  } else {
    storeCurrentDayToAsyncStorage(Number(currentDay));
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
