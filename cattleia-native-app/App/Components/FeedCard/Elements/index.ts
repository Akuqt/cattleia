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
  bg?: string;
  round?: boolean;
  mb?: string;
  mt?: string;
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
  background-color: ${p => (p.bg ? p.bg : 'transparent')};
  margin-bottom: ${p => (p.mb ? p.mb : '0px')};
  margin-top: ${p => (p.mt ? p.mt : '0px')};

  border-bottom-left-radius: ${p => (p.round ? '6px' : '0px')};
  border-bottom-right-radius: ${p => (p.round ? '6px' : '0px')};
  border-top-left-radius: ${p => (p.round ? '6px' : '0px')};
  border-top-right-radius: ${p => (p.round ? '6px' : '0px')};
`;

export const Txt = styled.Text<{bold?: boolean; color: string; fs: string}>`
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  font-size: ${p => p.fs};
  color: ${p => p.color};
`;

export const Img = styled.Image`
  width: 120px;
  height: 120px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
