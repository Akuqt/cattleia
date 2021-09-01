import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';

export interface IPassword {
  help?: boolean;
  policy?: boolean;
  helpHandler?: () => void;
  handler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: any;
}
