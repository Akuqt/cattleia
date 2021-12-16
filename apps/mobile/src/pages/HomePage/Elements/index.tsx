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
