import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';

export const Product: React.FC<any> = ({route}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.fontPrimary}}>
        Product! {route.params.id}
      </Text>
    </View>
  );
};
