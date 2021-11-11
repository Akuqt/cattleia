import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {theme, icons} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Alert, Image} from 'react-native';
import {
  Container,
  Option,
  OptionContainer,
  OptionGroup,
  IconContainer,
  Txt,
} from './Elements';

export const Options: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <OptionGroup colors={colors} height="35%">
        <Image
          style={{width: '70%', height: '70%'}}
          source={{
            uri: darkTheme
              ? 'asset:/images/logo2.png'
              : 'asset:/images/logo.png',
          }}
        />
      </OptionGroup>
      <OptionGroup border colors={colors} height="35%">
        <Txt colors={colors} style={{textAlign: 'justify'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          neque provident saepe ad dolor ducimus aliquid, ab rerum. Earum qui
          animi iusto debitis quo cum molestias nobis ab nihil cupiditate! Lorem
          ipsum dolor sit amet consectetur adipisicing.
        </Txt>
      </OptionGroup>
      <OptionGroup border colors={colors} height="20%">
        <OptionContainer>
          <Option onPress={() => navigation.navigate('Settings')}>
            <IconContainer>
              <IonIcons
                name={icons.settings.filled}
                color={colors.secondary}
                size={25}
              />
            </IconContainer>
            <Txt colors={colors}>Settings</Txt>
          </Option>
        </OptionContainer>
        <OptionContainer>
          <Option onPress={() => navigation.navigate('About')}>
            <IconContainer>
              <IonIcons
                name={icons.information.filled}
                color={colors.secondary}
                size={25}
              />
            </IconContainer>
            <Txt colors={colors}>About</Txt>
          </Option>
        </OptionContainer>
        <OptionContainer>
          <Option onPress={() => Alert.alert('Help')}>
            <IconContainer>
              <IonIcons
                name={icons.help.filled}
                color={colors.secondary}
                size={25}
              />
            </IconContainer>
            <Txt colors={colors}>Help</Txt>
          </Option>
        </OptionContainer>
      </OptionGroup>
      <OptionGroup colors={colors} height="10%"></OptionGroup>
    </Container>
  );
};
