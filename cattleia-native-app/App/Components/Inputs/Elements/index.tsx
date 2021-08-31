import styled from 'styled-components/native';

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

export const Help = styled.TouchableOpacity`
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const HelpTxt = styled.Text<{colors: any}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 4px;
  color: ${p => p.colors.primary};
`;

export const Policy = styled.View`
  padding: 6px 0px 6px 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const PolicyTxt = styled.Text<{colors: any}>`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${p => p.colors.fontPrimary};
`;

export const PolicyTxt2 = styled.Text<{colors: any}>`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: ${p => p.colors.primary};
`;

export const IconP = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  left: 290px;
  top: 22px;
`;
