import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Switch} from 'react-native';
import {RootState, setMode} from '../../redux';
import {OptionContainer} from './Elements';
import {theme} from 'utils';

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
