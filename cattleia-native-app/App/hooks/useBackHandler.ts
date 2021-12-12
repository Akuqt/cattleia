import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useBackHandler = (handler: () => void) => {
  useEffect(() => {
    const backAction = () => {
      handler();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handler]);
};
