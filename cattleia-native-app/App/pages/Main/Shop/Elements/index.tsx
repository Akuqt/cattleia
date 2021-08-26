import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 48px;
`;

export const Header = styled.View`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const Filter = styled.TouchableOpacity`
  margin: 10px 20px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.View`
  margin: 2px 20px;
`;

export const Img = styled.Image`
  width: 117px;
  height: 111px;
`;

export const Grid = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
