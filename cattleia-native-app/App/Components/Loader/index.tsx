import React from 'react';
import {View, ActivityIndicator} from 'react-native';

interface Props {
  dark?: boolean;
}

export const Load: React.FC<Props> = ({dark}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: dark ? '#171717' : '#fff',
      }}>
      <ActivityIndicator size="large" color={dark ? '#fff' : '#000'} />
    </View>
  );
};
