import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
  `The package '@computools/react-native-dynamic-app-icon' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ReactNativeDynamicAppIcon = NativeModules.ReactNativeDynamicAppIcon
  ? NativeModules.ReactNativeDynamicAppIcon
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function changeIcon(iconName: string): Promise<void> {
  return ReactNativeDynamicAppIcon.changeIcon(iconName);
}

export function getIcon(): Promise<string> {
  return ReactNativeDynamicAppIcon.getIcon();
}
