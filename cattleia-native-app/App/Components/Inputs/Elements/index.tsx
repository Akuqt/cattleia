import styled from 'styled-components/native';

export const Container = styled.View<{width: string; mg: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: ${p => p.width};
  margin: ${p => p.mg};
`;
export const CodeContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Txt = styled.Text<{fs: string; color: string; bold?: boolean}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
`;

export const Input2 = styled.TextInput<{
  bg: string;
  color: string;
  width: string;
  height: string;
  fs: string;
}>`
  background-color: ${p => p.bg};
  font-size: ${p => p.fs};
  color: ${p => p.color};
  width: ${p => p.width};
  height: ${p => p.height};
`;

export const InputGroup = styled.View<{lm?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: ${p => (p.lm ? '6px 0px' : '20px 0px')};
  position: relative;
`;

export const Input = styled.TextInput<{colors: any}>`
  background-color: ${p => p.colors.inputBg};
  width: 330px;
  height: 40px;
  font-size: 16px;
  color: ${p => p.colors.inputTxt};
`;

export const Label2 = styled.Text<{color: string; btn?: boolean; fs?: string}>`
  color: ${p => p.color};
  font-weight: 500;
  line-height: 15px;
  font-size: ${p => (p.fs ? p.fs : '14px')};
  margin-bottom: 4px;
`;
export const Label = styled.Text<{colors: any; btn?: boolean}>`
  color: ${p => (p.btn ? p.colors.inputTxt : p.colors.fontPrimary)};
  font-weight: 500;
  line-height: 15px;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const Btn = styled.TouchableOpacity<{
  colors: any;
  width?: string;
  sec?: boolean;
  alignLabel: 'start' | 'center' | 'end';
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${p =>
    p.alignLabel === 'start'
      ? 'flex-start'
      : p.alignLabel === 'center'
      ? p.alignLabel
      : p.alignLabel === 'end'
      ? 'flex-end'
      : 'center'};
  align-items: center;
  background-color: ${p => (p.sec ? p.colors.inputBg : p.colors.primary)};
  width: ${p => (p.width ? p.width : '330px')};
  height: 40px;
  padding: 0px 10px;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
export const InputGroup2 = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 10px 0px;
`;

export const Help = styled.TouchableOpacity`
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const HelpTxt = styled.Text<{color: string}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 4px;
  color: ${p => p.color};
`;

export const Policy = styled.View`
  padding: 6px 0px 6px 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const PolicyTxt = styled.Text<{color: string}>`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${p => p.color};
`;

export const PolicyTxt2 = styled.Text<{color: string}>`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: ${p => p.color};
`;

export const IconP = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  left: 290px;
  top: 22px;
`;
