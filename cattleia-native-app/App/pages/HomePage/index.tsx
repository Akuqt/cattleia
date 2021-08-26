import React from 'react';
import {Btn, Container, Title, Txt} from './Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {theme} from '../../utils';

import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomePage: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const HomePage: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <Title colors={colors} mb="0px">
        Welcome
      </Title>
      <Title colors={colors} mb="25px">
        to Cattleia
      </Title>

      <Btn
        bg={colors.inputBg}
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={{
          borderRadius: 4,
        }}>
        <Txt btn colors={colors}>
          Sign Up
        </Txt>
      </Btn>
      <Btn
        bg={colors.primary}
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={{
          borderRadius: 4,
        }}>
        <Txt btn colors={colors}>
          Sign In
        </Txt>
      </Btn>
    </Container>
  );
};
