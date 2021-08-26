import React from 'react';
import {InputGroup, Btn, Label} from '../Elements';
import {ISubmit} from './interfaces';
import {theme} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const SubmitBtn: React.FC<ISubmit> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <InputGroup>
      <Btn
        colors={colors}
        style={{
          borderRadius: 4,
        }}
        onPress={props.handler}>
        <Label btn colors={colors}>
          {props.label}
        </Label>
      </Btn>
    </InputGroup>
  );
};
