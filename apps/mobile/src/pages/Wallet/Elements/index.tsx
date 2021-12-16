import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const Header = styled.Text<{color: string}>`
  color: ${p => p.color};
  font-size: 30px;
  font-weight: bold;
`;

export const Wrapper = styled.View<{mt: string}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: ${p => p.mt};
`;
