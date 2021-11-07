import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, Header, Title, Content, Group, Img} from './Elements';
import {icons, Theme} from '../../utils';

interface Props {
  margin: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  title: string;
  img?: {
    uri: string;
    width: number;
    height: number;
  };
  theme: Theme['dark'] | Theme['light'];
}

export const Accordion: React.FC<Props> = props => {
  const [show, setShow] = useState(false);

  return (
    <Container m={props.margin} bb={props.borderBottom} bt={props.borderTop}>
      <Header onPress={() => setShow(c => !c)}>
        <Group>
          {props.img && (
            <Img
              source={{uri: props.img.uri}}
              style={{
                width: props.img.width,
                height: props.img.height,
              }}
            />
          )}
          <Title color={props.theme.fontPrimary} fs="15px">
            {props.title}
          </Title>
        </Group>
        {show ? (
          <Ionicons
            name={icons.chevronUp.outline}
            color={props.theme.fontPrimary}
            size={24}
          />
        ) : (
          <Ionicons
            name={icons.chevronDown.outline}
            color={props.theme.fontPrimary}
            size={24}
          />
        )}
      </Header>

      {show && <Content>{props.children}</Content>}
    </Container>
  );
};
