import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Theme} from '../../utils';
import {Container, Txt, Img} from './Elements';

interface Props {
  img: string;
  name: string;
  description: string;
  theme: Theme['dark'] | Theme['light'];
  handler: () => void;
}

export const NFTCard: React.FC<Props> = props => {
  return (
    <Container
      width="100%"
      align="center"
      justify="space-between"
      direction="row"
      pt="10px"
      pb="10px">
      <Container
        width="40%"
        align="center"
        justify="center"
        direction="row"
        pt="0px">
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          direction="row"
          pt="0px">
          <TouchableOpacity onPress={props.handler}>
            <Img source={{uri: props.img}} />
          </TouchableOpacity>
        </Container>
      </Container>
      <Container
        width="60%"
        align="center"
        justify="center"
        direction="column"
        pt="0px">
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          direction="row"
          pt="0px">
          <Txt color={props.theme.fontPrimary} fs="16px" bold>
            {props.name}
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          direction="row"
          pt="10px">
          <Txt color={props.theme.fontPrimary} fs="14px">
            {props.description}
          </Txt>
        </Container>
      </Container>
    </Container>
  );
};
