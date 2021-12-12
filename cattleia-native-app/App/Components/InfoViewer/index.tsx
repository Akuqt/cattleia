import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Theme} from '../../utils';
import {
  Container,
  BtnContainer,
  BtnTxt,
  Btn,
  ImgContainer,
  Img,
  InfoContainer,
  InfoTxt,
  BoundContainer,
} from './Elements';

interface Props {
  colors: Theme['light'] | Theme['dark'];
  mb: string;
  info: string[];
  next?: () => void;
  back?: {
    show: boolean;
    handler?: () => void;
  };
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  last?: boolean;
  img?: string;
}

export const Info: React.FC<Props> = props => {
  return (
    <GestureRecognizer
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSwipeLeft={props.onSwipeLeft}
      onSwipeRight={props.onSwipeRight}>
      <Container>
        <BoundContainer>
          {props.img && (
            <ImgContainer>
              <Img source={{uri: props.img}} />
            </ImgContainer>
          )}

          <InfoContainer>
            {props.info.map((info, i) => (
              <InfoTxt colors={props.colors} mb={props.mb} key={i}>
                {info}
              </InfoTxt>
            ))}
          </InfoContainer>
        </BoundContainer>

        <BtnContainer>
          {props.back?.show ? (
            <Btn onPress={props.back.handler}>
              <BtnTxt colors={props.colors}>Back</BtnTxt>
            </Btn>
          ) : (
            <BtnTxt colors={props.colors} />
          )}
          {!props.last ? (
            <Btn onPress={props.next}>
              <BtnTxt colors={props.colors}>Next</BtnTxt>
            </Btn>
          ) : (
            <BtnTxt colors={props.colors} />
          )}
        </BtnContainer>
      </Container>
    </GestureRecognizer>
  );
};
