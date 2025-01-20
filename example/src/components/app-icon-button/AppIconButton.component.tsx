import React from 'react';
import {changeIcon} from '@computools/react-native-dynamic-app-icon';
import {Alert, Image, type ImageSourcePropType, Platform, TouchableOpacity} from 'react-native';

import {styles} from './app-icon-button.styles';
import {type AppIconName} from '../../types/app-icon-name.types';

interface Props {
  source: ImageSourcePropType;
  appIconName: AppIconName;
  currentAppIconName: AppIconName | null;

  onAppIconChanged: (appIconName: AppIconName) => void;
}

export const AppIconButton: React.FC<Props> = ({source, appIconName, currentAppIconName, onAppIconChanged}) => {
  const handleButtonPress = async () => {
    if (Platform.OS === 'android') {
      changeAppIconOnAndroid();
    } else {
      await changeAppIcon();
      onAppIconChanged(appIconName);
    }
  };

  const changeAppIcon = async () => {
    try {
      await changeIcon(appIconName);
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  const changeAppIconOnAndroid = () => {
    Alert.alert('Note', 'Changing the app icon will restart the application to apply the changes.', [
      {text: 'Ok', onPress: changeAppIcon},
      {text: 'Cancel'},
    ]);
  };

  return (
    <TouchableOpacity style={[styles.container, {borderWidth: Number(currentAppIconName === appIconName)}]} onPress={handleButtonPress}>
      <Image source={source} style={styles.appIconImage} />
    </TouchableOpacity>
  );
};
