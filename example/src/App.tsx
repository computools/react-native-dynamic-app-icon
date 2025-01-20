import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, NativeModules, type ImageSourcePropType, Platform} from 'react-native';

import {AppIconType} from './types/app-icon-type.types';
import {AppIconButton} from './components/app-icon-button/AppIconButton.component';
import {type AndroidAppIconName, type IOSAppIconName, type AppIconName} from './types/app-icon-name.types';

const {RNChangeIcon} = NativeModules;

interface AppIcon {
  name: AppIconName;
  source: ImageSourcePropType;
}

const appIconPlatfromNames: Record<AppIconType, {iosName: IOSAppIconName; androidName: AndroidAppIconName}> = {
  [AppIconType.DEFAULT]: {iosName: 'DefaultIcon', androidName: 'Default'},
  [AppIconType.ORANGE]: {iosName: 'OrangeIcon', androidName: 'Orange'},
  [AppIconType.PINEAPPLE]: {iosName: 'PineappleIcon', androidName: 'Pineapple'},
  [AppIconType.STREWBERRY]: {iosName: 'StrawberryIcon', androidName: 'Strawberry'},
};

const getAppIconName = (appIconType: AppIconType) => {
  const appIconNames = appIconPlatfromNames[appIconType];

  return Platform.OS === 'ios' ? appIconNames.iosName : appIconNames.androidName;
};

const appIcons: AppIcon[] = [
  {name: getAppIconName(AppIconType.DEFAULT), source: require('./assets/app-icons/apple.png')},
  {name: getAppIconName(AppIconType.ORANGE), source: require('./assets/app-icons/orange.png')},
  {name: getAppIconName(AppIconType.STREWBERRY), source: require('./assets/app-icons/strawberry.jpg')},
  {name: getAppIconName(AppIconType.PINEAPPLE), source: require('./assets/app-icons/pineapple.png')},
];

function App(): React.JSX.Element {
  const [currentAppIconName, setCurrentAppIconName] = useState<AppIconName | null>(null);

  useEffect(() => {
    getCurrentAppIconName();
  }, []);

  const getCurrentAppIconName = async () => {
    try {
      const appIcon = await RNChangeIcon.getIcon();

      setCurrentAppIconName(appIcon);
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  const renderAppIconButton = (appIcon: AppIcon) => (
    <AppIconButton
      key={appIcon.name}
      source={appIcon.source}
      appIconName={appIcon.name}
      currentAppIconName={currentAppIconName}
      onAppIconChanged={setCurrentAppIconName}
    />
  );

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.text}>Select App Icon:</Text>
      {appIcons.map(renderAppIconButton)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default App;
