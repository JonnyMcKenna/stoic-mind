import React from "react";
import { View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";

const BannerAd = () => {
  const testID = "ca-app-pub-3940256099942544/6300978111";
  const productionID = "ca-app-pub-8720230404543468/6602074352";
  // Is a real device and running in production.
  const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;

  const bannerError = (error: any) => {
    console.log("Error receiving Ad: " + error);
    return;
  };

  return (
    <View
      style={{
        backgroundColor: "#181A20",
        alignItems: "center",
      }}
    >
      <AdMobBanner
        adUnitID={adUnitID}
        bannerSize="smartBannerLandscape"
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
};

export default BannerAd;
