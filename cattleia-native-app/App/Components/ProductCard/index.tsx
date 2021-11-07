import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme, icons} from '../../utils';
import {
  Container,
  ImgPriceContainer,
  Img,
  Txt,
  InfoContainer,
  BtnContainer,
  Btn,
} from './Elements';

interface Props {
  name: string;
  description: string;
  price: number;
  image?: string;
  onPress: () => void;
  theme: Theme['dark'] | Theme['light'];
  shop?: boolean;
  centerInfo?: boolean;
  disabled?: boolean;
}

export const ProductCard: React.FC<Props> = props => {
  return (
    <Container onPress={props.onPress} disabled={props.disabled}>
      <ImgPriceContainer>
        <Img source={{uri: props.image}} />
      </ImgPriceContainer>
      <InfoContainer center={props.centerInfo}>
        <Txt color={props.theme.fontPrimary} bold fs="15px">
          {props.name}
        </Txt>
        <Txt
          color={props.theme.fontPrimary}
          fs={props.shop ? '18px' : '15px'}
          bold={!!!props.shop}>
          {props.price === 0 ? 'free' : `$${props.price}`}
        </Txt>
        {!!props.shop && (
          <Txt color={props.theme.fontPrimary} fs="14px">
            {props.description}
          </Txt>
        )}
      </InfoContainer>
      {!!!props.shop && (
        <BtnContainer>
          <Btn onPress={props.onPress}>
            <Ionicons
              name={icons.trash.outline}
              color={props.theme.primary}
              size={25}
            />
          </Btn>
        </BtnContainer>
      )}
    </Container>
  );
};
