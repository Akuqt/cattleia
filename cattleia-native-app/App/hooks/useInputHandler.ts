import {useState} from 'react';
import {TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';

type Event = NativeSyntheticEvent<TextInputChangeEventData>;

export const useInputHandler = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const handler = (k: keyof T) => (e: Event, txt?: string) => {
    if (txt) {
      setState({...state, [k]: txt});
    } else if (e) {
      setState({...state, [k]: e.nativeEvent.text});
    }
  };
  return {values: state, handler, clearValues: () => setState(initialState)};
};
