import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

export const Img = styled.View`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Txt = styled.Text<{
  fs: string;
  color: string;
  bold?: boolean;
}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
`;

export const Input = styled.TextInput`
  width: 45px;
  height: 40px;
  background-color: #c4c4c4;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 0px;
  margin: 5px;
`;
