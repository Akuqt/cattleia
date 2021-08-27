import React from 'react';
import {View, Text, Switch, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {OptionContainer} from './Elements';
import {setMode} from '../../redux/theme';
import {RootState} from '../../redux/store';
import {theme} from '../../utils';

export const Settins: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const dispatch = useDispatch();
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <OptionContainer>
        <Text
          style={{
            color: colors.fontPrimary,
          }}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{false: colors.secondary, true: colors.primary}}
          thumbColor={darkTheme ? colors.fontPrimary : colors.inputBg}
          onValueChange={() => {
            dispatch(setMode(!darkTheme));
          }}
          value={darkTheme}
        />
      </OptionContainer>
    </View>
  );
};
