import styled from 'styled-components/native';

export const Container = styled.View<{
  m: string;
  bt?: boolean;
  bb?: boolean;
}>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  border-top-width: ${p => (p.bt ? '1px' : '0px')};
  border-bottom-width: ${p => (p.bb ? '1px' : '0px')};
  border-top-color: #e1dddd;
  border-bottom-color: #e1dddd;
  margin: ${p => p.m};
`;

export const Header = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0px;
`;

export const Group = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Img = styled.Image`
  margin-right: 10px;
`;

export const Title = styled.Text<{
  fs: string;
  color: string;
  bold?: boolean;
}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;
