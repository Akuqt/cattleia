import React, {useState} from 'react';
import {View, Text, Switch, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {OptionContainer} from './Elements';
import {setMode} from '../../redux/theme';
import {RootState} from '../../redux/store';
import {theme} from '../../utils';

import DropDownPicker from 'react-native-dropdown-picker';

export const Settins: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Apple',
      value: 'apple',
      icon: () => (
        <Image
          source={require('../../assets/images/base-1.png')}
          style={{
            width: 30,
            height: 30,
          }}
        />
      ),
    },
    {
      label: 'Banana',
      value: 'banana',
      icon: () => (
        <Image
          source={require('../../assets/images/base-1.png')}
          style={{
            width: 30,
            height: 30,
          }}
        />
      ),
    },
  ]);

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
      <OptionContainer>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          closeAfterSelecting={true}
          theme={darkTheme ? 'DARK' : 'LIGHT'}
        />
      </OptionContainer>
    </View>
  );
};
