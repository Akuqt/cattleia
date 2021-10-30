import React from 'react';
import {Theme} from '../../utils';
import {
  Container,
  ImgPriceContainer,
  Img,
  Txt,
  InfoContainer,
} from './Elements';

interface Props {
  name: string;
  description: string;
  price: number;
  image?: string;
  onPress: () => void;
  theme: Theme['dark'] | Theme['light'];
  shop?: boolean;
}

export const ProductCard: React.FC<Props> = props => {
  return (
    <Container onPress={() => props.onPress()}>
      <ImgPriceContainer>
        <Img source={{uri: 'asset:/images/base-3.png'}} />
      </ImgPriceContainer>
      <InfoContainer>
        <Txt color={props.theme.fontPrimary} bold fs="15px">
          {props.name}
        </Txt>
        <Txt
          color={props.theme.fontPrimary}
          fs={props.shop ? '18px' : '15px'}
          bold={!!!props.shop}>
          {props.price === 0 ? 'free' : `$${props.price}`}
        </Txt>
        {props.shop && (
          <Txt color={props.theme.fontPrimary} fs="14px">
            {props.description}
          </Txt>
        )}
      </InfoContainer>
    </Container>
  );
};
