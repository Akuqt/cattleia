import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';
import {useState} from 'react';

type Event = NativeSyntheticEvent<TextInputChangeEventData>;

export const useInputHandler = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const handler = (k: keyof T) => (e: Event) => {
    setState({...state, [k]: e.nativeEvent.text});
  };
  return {values: state, handler};
};
