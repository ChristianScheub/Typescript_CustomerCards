import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

export const makeStatusBarTransparent = async () => {
    if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#161616' });
    }
  };