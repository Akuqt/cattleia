import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInputHandler} from '../../hooks';

type ParamList = {
  Main: undefined;
  Register: undefined;
  Verify: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Main'>;

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const Img = styled.View`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Txt = styled.Text<{
  fs: string;
  color: string;
  bold?: boolean;
}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
`;

const Input = styled.TextInput`
  width: 45px;
  height: 40px;
  background-color: #c4c4c4;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 0px;
  margin: 5px;
`;

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
      if (c === '222234') {
        navigation.navigate('Main');
      }
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
