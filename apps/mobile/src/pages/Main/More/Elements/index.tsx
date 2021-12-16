import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OptionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
`;

export const Option = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 4px 15px;
`;

export const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const Txt = styled.Text<{colors: any}>`
  font-size: 16px;
  color: ${p => p.colors.fontPrimary};
  font-weight: 900;
`;

export const OptionGroup = styled.View<{
  height: string;
  border?: boolean;
  colors: any;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  height: ${p => p.height};
  border-top-width: ${p => (p.border ? '1px' : '0px')};
  border-top-color: ${p => p.colors.fontPrimary};
`;
