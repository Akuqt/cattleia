import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const BoundContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 85%;
`;

export const ImgContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0px;
`;

export const Img = styled.Image`
  width: 120px;
  height: 160px;
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 50px;
`;

export const InfoTxt = styled.Text<{ mb: string; colors: any }>`
  color: ${(p) => p.colors.fontPrimary};
  font-size: 18px;
  text-align: center;
  margin-bottom: ${(p) => p.mb};
`;

export const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const Btn = styled.TouchableOpacity`
  margin: 20px 40px;
`;

export const BtnTxt = styled.Text<{ colors: any }>`
  color: ${(p) => p.colors.primary};
  font-size: 24px;
`;
