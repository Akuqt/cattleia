import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Text} from 'react-native';
import {Container, Message, Icon} from './Elements';
import {IModalInfo} from './interfaces';
import {theme, icons} from '../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export const ModalInfo: React.FC<IModalInfo> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container colors={colors}>
      <Message colors={colors} style={{borderRadius: 6}}>
        <Icon>
          <TouchableOpacity onPress={() => props.show(false)}>
            <Ionicons
              name={icons.close.outline}
              color={colors.secondary}
              size={25}
            />
          </TouchableOpacity>
        </Icon>
        <Text style={{color: colors.fontPrimary}}>{props.info}</Text>
      </Message>
    </Container>
  );
};
