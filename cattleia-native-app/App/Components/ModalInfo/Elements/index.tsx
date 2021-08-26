import styled from 'styled-components/native';

export const Container = styled.View<{colors: any}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${p => p.colors.modalBg};
`;

export const Message = styled.View<{colors: any}>`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100px;
  background-color: ${p => p.colors.modalMsgBg};
  padding: 10px;
`;

export const Icon = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
`;
