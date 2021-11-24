import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Title} from './Elements';
import {useSelector} from 'react-redux';
import {SubmitBtn} from '../../Components';
import {RootState} from '../../redux/store';
import {theme} from '../../utils';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
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

      <SubmitBtn
        lm
        sec
        width="170px"
        handler={() => {
          navigation.navigate('Register');
        }}
        colors={colors}
        label="Sign Up"
        alignLabel="start"
      />
      <SubmitBtn
        lm
        width="170px"
        handler={() => {
          navigation.navigate('Login');
        }}
        colors={colors}
        label="Sign In"
        alignLabel="start"
      />
    </Container>
  );
};
