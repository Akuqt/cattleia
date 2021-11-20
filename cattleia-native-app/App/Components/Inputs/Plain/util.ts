import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';

export interface Props {
  handler: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    txt?: string,
  ) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  format?: (txt: string) => string;
  value: string;
  label?: string;
  password?: {
    help?: {
      color: string;
      handler: () => void;
    };
    policy?: {
      color1: string;
      color2: string;
      terms: () => void;
      notice: () => void;
    };
  };
  type: 'Password' | 'Text' | 'Number' | 'Email';
  width: string;
  height: string;
  margin: string;
  fs: string;
  bg: string;
  fontColor: string;
  labelFontColor: string;
  lableFs?: string;
  length?: number;
  aling?: 'center' | 'left' | 'right';
  placeholder?: string;
  clipboard?: boolean;
  disabled?: boolean;
  differValue?: boolean;
  txt?: string;
}

export const getKeyboardType = (prop: Props['type']): KeyboardTypeOptions => {
  switch (prop) {
    case 'Text':
      return 'default';
    case 'Password':
      return 'default';
    case 'Email':
      return 'email-address';
    case 'Number':
      return 'number-pad';
  }
};
