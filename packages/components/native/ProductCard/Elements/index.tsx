import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;
  margin: 4px 0px;
  padding: 0px 15px;
`;

export const Img = styled.Image`
  width: 155px;
  height: 85%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ImgPriceContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: #8080802f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const InfoContainer = styled.View<{center?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: ${p => (p.center ? 'center' : 'flex-start')};
  width: 30%;
`;

export const BtnContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  padding: 10px 0px;
`;

export const Btn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Txt = styled.Text<{color: string; bold?: boolean; fs: string}>`
  color: ${p => p.color};
  margin: 10px 10px 0px 20px;
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  font-size: ${p => p.fs};
`;
