import React from 'react';
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
import {InfoProps} from './interfaces';
import {theme} from '../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export const Info: React.FC<InfoProps> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <BoundContainer>
        <ImgContainer>
          <Img source={require('../../assets/images/logo.png')} />
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
