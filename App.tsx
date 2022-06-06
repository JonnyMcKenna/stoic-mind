import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { PermissionStatus } from "expo-modules-core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import * as Notifications from "expo-notifications";
import SplashScreenAnimation from "./components/SplashScreenAnimation";
import { LogBox } from "react-native";
import useColorScheme from "./hooks/useColorScheme";
import BannerAd from "./components/BannerAd";
import { Notification } from "./types/genericTypes";

LogBox.ignoreLogs(["Remote debugger"]);

export default function App() {
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const isLoadingComplete = useCachedResources();
  const [showSplash, setShowSplash] = useState(true);

  const handleNotification = (notification: Notification) => {
    const { title } = notification.request.content;
    console.warn(title);
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowDisplayInCarPlay: true,
        allowCriticalAlerts: true,
        provideAppNotificationSettings: true,
        allowProvisional: true,
        allowAnnouncements: true,
      },
    });
    setNotificationPermissions(status);
    return status;
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return showSplash ? (
      <SafeAreaProvider>
        <SplashScreenAnimation />
      </SafeAreaProvider>
    ) : (
      <SafeAreaProvider>
        <Navigation />
        <BannerAd />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
