import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Hero = styled.View<{
  bg: string;
  orientation?: 'row' | 'column';
  heigth?: string;
  mt: string;
}>`
  display: flex;
  flex-direction: ${p => (p.orientation ? p.orientation : 'row')};
  align-items: ${p => (p.orientation === 'column' ? 'flex-start' : 'center')};
  justify-content: ${p =>
    p.orientation === 'row' || !p.orientation ? 'space-between' : 'center'};
  width: 100%;
  background-color: ${p => p.bg};
  padding: 10px 20px;
  margin: ${p => p.mt} 0px 0px 0px;
  height: ${p => (p.heigth ? p.heigth : 'auto')};
`;

export const OptionsContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

export const Option = styled.View<{ml?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${p => (p.ml ? p.ml : '0px')};
`;

export const Txt = styled.Text<{
  fs: string;
  color: string;
  bold?: boolean;
  mb?: string;
}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  margin-bottom: ${p => (p.mb ? p.mb : '0px')};
`;
