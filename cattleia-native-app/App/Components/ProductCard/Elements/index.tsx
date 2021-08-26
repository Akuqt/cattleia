import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 188px;
`;

export const Img = styled.Image`
  width: 150px;
  height: 100%;
`;

export const PriceInfo = styled.View`
  display: flex;
  flex-direction: row;
  width: 140px;
  justify-content: space-between;
  align-items: center;
`;

export const ImgPriceContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 200px;
  height: 100%;
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const Price = styled.Text`
  font-weight: bold;
`;

export const Txt = styled.Text<{colors: any}>`
  color: ${p => p.colors.fontPrimary};
  padding: 0px 6px;
`;
