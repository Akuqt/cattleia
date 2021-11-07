import React, {useEffect, useState} from 'react';
import {Container, InputContainer, Txt, Img, Input} from './Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInputHandler} from '../../hooks';

type ParamList = {
  Main: undefined;
  Register: undefined;
  Verify: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Main'>;

export const Verify: React.FC<Props> = ({navigation}) => {
  const {handler, values} = useInputHandler({
    v1: '',
    v2: '',
    v3: '',
    v4: '',
    v5: '',
    v6: '',
  });

  const [info, setInfo] = useState('');

  type Key = Parameters<typeof handler>[0];

  useEffect(() => {
    let c = '';
    Object.values(values).forEach(e => {
      if (e !== '') c += e;
    });
    if (c.length === 6) {
      setInfo('');
      navigation.navigate('Main');
    } else {
      setInfo(
        `Incorrect code! Need ${6 - c.length} more digit${
          c.length < 5 ? 's' : ''
        }`,
      );
    }
  }, [values]);

  return (
    <Container>
      <Txt fs="18px" color="#000" bold>
        Enter your verification code
      </Txt>
      <Txt fs="14px" color="#000">
        We sent the code to your email
      </Txt>

      <InputContainer>
        {Object.keys(values).map(e => (
          <Input
            key={e}
            keyboardType="number-pad"
            maxLength={1}
            value={values[e as Key]}
            onChange={handler(e as Key)}
          />
        ))}
      </InputContainer>

      <Txt fs="14px" color="red">
        {info}
      </Txt>

      <Img />
    </Container>
  );
};
