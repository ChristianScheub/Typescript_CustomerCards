import { AdMob, AdOptions } from "@capacitor-community/admob";
import { Capacitor } from "@capacitor/core";
import Logger from "../Logger/logger";
import { config } from "./config";

const showAdInterstitial = async () => {
  try {
    Logger.info("Start Interstitial Ad");
    let adId: string;
      if (Capacitor.getPlatform() === "android") {
        adId = config.interstitial.android;
      } else if (Capacitor.getPlatform() === "ios") {
        adId = config.interstitial.ios;
      } else {
        adId = config.interstitial.android;
      }

    const options: AdOptions = {
      adId: adId
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  } catch (error) {
    Logger.error("Error while loading Interstitial ad: " + error);
  }
};

export default showAdInterstitial;