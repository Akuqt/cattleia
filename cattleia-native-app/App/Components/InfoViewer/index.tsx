import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {theme} from '../../utils';
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
  mb: string;
  info: string[];
  handler?: () => void;
  back?: {
    show: boolean;
    handler?: () => void;
  };
  last?: boolean;
}

export const Info: React.FC<Props> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <BoundContainer>
        <ImgContainer>
          <Img source={{uri: 'asset:/images/logo.png'}} />
        </ImgContainer>

        <InfoContainer>
          {props.info.map((info, i) => (
            <InfoTxt colors={colors} mb={props.mb} key={i}>
              {info}
            </InfoTxt>
          ))}
        </InfoContainer>
      </BoundContainer>

      <BtnContainer>
        {props.back?.show ? (
          <Btn onPress={props.back.handler}>
            <BtnTxt colors={colors}>Back</BtnTxt>
          </Btn>
        ) : (
          <BtnTxt colors={colors}></BtnTxt>
        )}
        {!props.last ? (
          <Btn onPress={props.handler}>
            <BtnTxt colors={colors}>Next</BtnTxt>
          </Btn>
        ) : (
          <BtnTxt colors={colors}></BtnTxt>
        )}
      </BtnContainer>
    </Container>
  );
};
