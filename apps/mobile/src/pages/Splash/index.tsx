import React from 'react';
import LottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {theme} from 'utils';
import {View} from 'react-native';
import darkAni from 'animations/splash/dark.json';
import lightAni from 'animations/splash/light.json';

type RootStackParamList = {
  Pages: undefined;
  Splash: any;
};

interface Props {
  dark?: boolean;
}

type FProps = NativeStackScreenProps<RootStackParamList, 'Splash'> & Props;

export const Splash: React.FC<FProps> = ({dark, navigation}) => {
  const colors = dark ? theme.dark : theme.light;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={dark ? darkAni : lightAni}
        style={{
          width: '120%',
          aspectRatio: 1,
        }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          navigation.navigate('Pages');
        }}
      />
    </View>
  );
};
