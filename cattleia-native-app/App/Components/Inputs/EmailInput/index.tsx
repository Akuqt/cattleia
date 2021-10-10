import React from 'react';
import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';
import {InputGroup, Input, Label} from '../Elements';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';

interface Props {
  label: string;
  handler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: any;
}

export const EmailInput: React.FC<Props> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <InputGroup>
      <Label colors={colors}>{props.label}</Label>
      <Input
        colors={colors}
        style={{borderRadius: 4}}
        keyboardType="email-address"
        value={props.value}
        onChange={props.handler}
      />
    </InputGroup>
  );
};
