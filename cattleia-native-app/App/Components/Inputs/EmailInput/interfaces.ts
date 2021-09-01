import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';

export interface IPlain {
  label: string;
  handler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: any;
}
