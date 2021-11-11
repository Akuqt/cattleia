import React from 'react';
import {InputGroup, Btn, Label} from '../Elements';

interface Props {
  label: string;
  handler: () => void;
  width?: string;
  colors: any;
  lm?: boolean;
  sec?: boolean;
  alignLabel?: 'start' | 'center' | 'end';
  disabled?: boolean;
}

export const SubmitBtn: React.FC<Props> = props => {
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
        disabled={props.disabled}
        onPress={props.handler}>
        <Label btn colors={props.colors}>
          {props.label}
        </Label>
      </Btn>
    </InputGroup>
  );
};
