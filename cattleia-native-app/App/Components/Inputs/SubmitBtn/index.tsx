import React from 'react';
import {InputGroup, Btn, Label} from '../Elements';
import {ISubmit} from './interfaces';

export const SubmitBtn: React.FC<ISubmit> = props => {
  return (
    <InputGroup lm={props.lm}>
      <Btn
        alignLabel={props.alignLabel || 'center'}
        sec={props.sec}
        width={props.width}
        colors={props.colors}
        style={{
          borderRadius: 4,
        }}
        onPress={props.handler}>
        <Label btn colors={props.colors}>
          {props.label}
        </Label>
      </Btn>
    </InputGroup>
  );
};
