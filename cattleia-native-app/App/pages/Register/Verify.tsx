import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Img, Txt} from './Elements';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {theme} from '../../utils';
import {Image} from 'react-native';
import {Code} from '../../Components';

type ParamList = {
  Main: undefined;
  Register: undefined;
  Verify: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Verify'>;

export const Verify: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <Txt fs="18px" color={colors.fontPrimary} bold>
        Enter your verification code
      </Txt>
      <Txt fs="14px" color={colors.fontPrimary}>
        We sent the code to your email
      </Txt>
      <Code
        color={colors.fontPrimaryInput}
        fs="16px"
        bg={colors.inputBg}
        slotWidth="45px"
        slotHeigth="40px"
        length={6}
        init={'1'}
        onComplete={code => {
          if (code === '123456') {
            navigation.navigate('Main');
          }
        }}
      />
      <Img>
        <Image
          source={{
            uri: darkTheme
              ? 'asset:/images/logo2.png'
              : 'asset:/images/logo.png',
          }}
          style={{width: '50%', height: '50%'}}
        />
      </Img>
    </Container>
  );
};
