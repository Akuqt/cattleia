import React from 'react';

import {InputGroup, Input, Label} from '../Elements';
import {IPlain} from './interfaces';

import {theme} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const PlainInput: React.FC<IPlain> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <InputGroup>
      <Label colors={colors}>{props.label}</Label>
      <Input
        colors={colors}
        style={{borderRadius: 4}}
        onChange={props.handler}
        value={props.value}
      />
    </InputGroup>
  );
};
