import {useState} from 'react';
import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';

type Event = NativeSyntheticEvent<TextInputChangeEventData>;

export const useInputHandler = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const handler = (k: keyof T) => (e: Event) => {
    setState({...state, [k]: e.nativeEvent.text});
  };
  return {values: state, handler};
};
