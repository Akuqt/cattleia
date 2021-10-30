import styled from 'styled-components/native';

export const Container = styled.View<{
  pt: string;
  direction: 'row' | 'column';
  full?: boolean;
  align: 'flex-start' | 'flex-end' | 'center';
  justify:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  width?: string;
  ps?: string;
}>`
  display: flex;
  flex-direction: ${p => p.direction};
  align-items: ${p => p.align};
  justify-content: ${p => p.justify};
  width: ${p => (p.full ? '100%' : p.width ? p.width : 'auto')};
  height: ${p => (p.full ? '100%' : 'auto')};
  padding-top: ${p => p.pt};
  padding-left: ${p => (p.ps ? p.ps : '0px')};
  padding-right: ${p => (p.ps ? p.ps : '0px')};
`;

export const Header = styled.View<{border?: boolean}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: ${p => (p.border ? '1px' : '0px')};
  border-bottom-color: #c4c4c4;
`;

export const Footer = styled.View<{border?: boolean}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-top-width: ${p => (p.border ? '1px' : '0px')};
  border-top-color: #c4c4c4;
  padding: 0px 20px;
`;

export const HeaderBtn = styled.TouchableOpacity<{margin: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${p => p.margin};
`;

export const Logo = styled.View<{mb: string}>`
  margin: 2px 20px ${p => p.mb} 20px;
`;

export const Img = styled.Image<{round?: boolean}>`
  width: 117px;
  height: 111px;

  border-bottom-left-radius: ${p => (p.round ? '20px' : '0px')};
  border-bottom-right-radius: ${p => (p.round ? '20px' : '0px')};
  border-top-left-radius: ${p => (p.round ? '20px' : '0px')};
  border-top-right-radius: ${p => (p.round ? '20px' : '0px')};
`;

export const Grid = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Txt = styled.Text<{bold?: boolean; color: string; fs: string}>`
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  font-size: ${p => p.fs};
  color: ${p => p.color};
`;

export const Btn = styled.TouchableOpacity<{
  bg: string;
  width: string;
  margin: string;
  round?: boolean;
  height: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${p => p.width};
  height: ${p => p.height};
  margin: ${p => p.margin};
  background-color: ${p => p.bg};
  border-bottom-left-radius: ${p => (p.round ? '20px' : '4px')};
  border-bottom-right-radius: ${p => (p.round ? '20px' : '4px')};
  border-top-left-radius: ${p => (p.round ? '20px' : '4px')};
  border-top-right-radius: ${p => (p.round ? '20px' : '4px')};
`;

export const SafeArea = styled.SafeAreaView``;
