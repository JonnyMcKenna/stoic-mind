# stoic-app

React Native - Stoic Mind

- Using Yarn

# Build app for android to generate local files

- yarn android

# Quotes

Quotes from https://www.sloww.co/stoic-quotes/

# Local Notifications

Notifications - https://docs.expo.dev/versions/latest/sdk/notifications/#requestpermissionsasyncrequest-notificationpermissionsrequest-promisenotificationpermissionsstatus

https://gist.github.com/VeraZab/c3f13d51588bcfdf6799da65decf26fa

# Local Storage - React Native Async Storage

- https://github.com/react-native-async-storage/async-storage
- https://react-native-async-storage.github.io/async-storage/docs/install/

# How to build and deploy ios and android react native apps with expo

To build ios or android apps - https://instabug.com/blog/react-native-app-ios-android/

- eas build --platform android

<!-- - expo build:android -->
<!-- - expo build:ios -->

# Background Fetch to create daily quote updates

https://docs.expo.dev/versions/latest/sdk/background-fetch/

# App Setup

Ensure you are at least using version 15 of node.

- nvm install 14
- nvm use 14
- node -v

Build Android:

- npm run android

Run on IOS:

- expo start --ios

Run on Android:

- expo start --android

Run Development Build of Android to Test on Simulator (This creates android folder):

- expo run:android

Run on Web:

- expo start --web

Ad using Google AdMob:

- https://www.crowdbotics.com/blog/how-to-implement-admob-in-react-native
- https://developers.google.com/admob/android/native/start
- https://www.npmjs.com/package/expo-ads-admob

TODO:

1. Have a generic notification. On app load check if date is different, if it=s update the quote
2. Add addNotificationResponseReceivedListener - This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed) - https://docs.expo.dev/push-notifications/overview/ and https://docs.expo.dev/versions/latest/sdk/notifications/
