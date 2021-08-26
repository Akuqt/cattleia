import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding-left: 40px;
`;

export const Title = styled.Text<{mb: string; colors: any}>`
  color: ${p => p.colors.primary};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: ${p => p.mb};
`;

export const Btn = styled.TouchableOpacity<{bg: string}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${p => p.bg};
  width: 200px;
  height: 40px;
  margin: 6px 0px;
`;

export const Txt = styled.Text<{colors: any; btn?: boolean}>`
  color: ${p => (p.btn ? p.colors.inputTxt : p.colors.fontPrimary)};
  margin-left: 20px;
`;
