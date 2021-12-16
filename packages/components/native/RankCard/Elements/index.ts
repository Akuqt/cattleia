import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 20px;
`;

export const Information = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Goal = styled.View`
  display: flex;
  flex-direction: column;
  width: 20%;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const Points = styled.View`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: flex-start;
`;

export const Txt = styled.Text<{
  fs: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
}>`
  font-size: ${p => p.fs};
  color: ${p => p.color};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  font-style: ${p => (p.italic ? 'italic' : 'normal')};
`;

export const Circle = styled.View<{radius: number; color: string}>`
  height: ${p => p.radius + 'px'};
  width: ${p => p.radius + 'px'};
  border-top-right-radius: ${p => p.radius / 2 + 'px'};
  border-top-left-radius: ${p => p.radius / 2 + 'px'};
  border-bottom-right-radius: ${p => p.radius / 2 + 'px'};
  border-bottom-left-radius: ${p => p.radius / 2 + 'px'};
  background-color: ${p => p.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Progress = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 85%;
`;

export const ProgressIndicator = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 4px;
  background-color: #e885b6;
`;

export const Line = styled.View<{progress: string; color: string}>`
  height: 4px;
  width: ${p => p.progress};
  background-color: ${p => p.color};
`;
