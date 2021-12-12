import React, {useEffect, useState, useRef} from 'react';
import {newObject} from '../../../utils';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import {
  InputContainer,
  Txt,
  Input2,
  InputGroup2,
  CodeContainer,
} from '../Elements';

type Event = NativeSyntheticEvent<TextInputChangeEventData>;

interface Props {
  length: number;
  onComplete: (code: string) => void;
  slotWidth: string;
  slotHeigth: string;
  bg: string;
  fs: string;
  color: string;
  init?: string;
}

export const Code: React.FC<Props> = ({length, onComplete, ...props}) => {
  const [values, setValues] = useState<{
    [k: string]: string;
  }>({});

  const vRefs = useRef<TextInput[]>([]);

  const [info, setInfo] = useState('');

  const handleChange = (prop: keyof typeof values) => (e: Event) => {
    setValues({...values, [prop]: e.nativeEvent.text});
  };

  useEffect(() => {
    vRefs.current = vRefs.current.slice(0, length);
    setValues(newObject(length, '', 'v'));
  }, [length]);

  useEffect(() => {
    if (props.init !== '' && props.init?.length === length) {
      setValues(newObject(length, '', 'v', props.init?.split('')));
    }
  }, [props.init, length]);

  useEffect(() => {
    let c = '';
    Object.values(values).forEach(e => {
      if (e !== '') {
        c += e;
      }
    });
    if (c.length === length) {
      setInfo('');
      onComplete(Object.values(values).join().replace(/,/g, ''));
    } else {
      setInfo(
        `Wrong code! Need ${length - c.length} more digit${
          c.length < length - 1 ? 's' : ''
        }`,
      );
    }
  }, [values, length, onComplete]);

  return (
    <CodeContainer>
      <InputGroup2>
        {Object.keys(values).map((p, i) => (
          <InputContainer key={p + i}>
            <Input2
              ref={el => {
                vRefs.current[i] = el as any;
              }}
              width={props.slotWidth}
              height={props.slotHeigth}
              key={p}
              bg={props.bg}
              color={props.color}
              fs={props.fs}
              keyboardType="number-pad"
              maxLength={1}
              value={values[p]}
              onKeyPress={ev => {
                if (ev.nativeEvent.key === 'Backspace') {
                  if (i > 0 && values[p] === '') {
                    vRefs.current[i - 1]?.focus();
                  }
                  setValues({...values, [p]: ''});
                }
              }}
              onChange={e => {
                if (e.nativeEvent.text.length > 0) {
                  if (
                    e.nativeEvent.text.charCodeAt(0) > 47 &&
                    e.nativeEvent.text.charCodeAt(0) < 58
                  ) {
                    handleChange(p)(e);
                    if (i === length - 1) {
                      vRefs.current[i]?.focus();
                    } else {
                      vRefs.current[i + 1]?.focus();
                    }
                  }
                }
              }}
              style={{borderRadius: 5, textAlign: 'center', fontWeight: 'bold'}}
            />
          </InputContainer>
        ))}
      </InputGroup2>

      <Txt fs="15px" color="red">
        {info}
      </Txt>
    </CodeContainer>
  );
};
