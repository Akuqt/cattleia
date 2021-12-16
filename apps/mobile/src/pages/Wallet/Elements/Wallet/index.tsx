import styled from 'styled-components/native';

export const Container = styled.View<{color: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${p => p.color};
`;

export const InfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const AccWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
`;

export const Section = styled.View<{heigth: string; border?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  height: ${p => p.heigth};
  border-top-width: ${p => (p.border ? '1px' : '0px')};
`;

export const Logo = styled.Image`
  width: 90px;
  height: 120px;
  margin: 5px 0px;
`;

export const Balance = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0px;
`;

export const MainTxt = styled.Text<{color: string}>`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
  color: ${p => p.color};
`;

export const Txt = styled.Text<{color: string}>`
  font-size: 16px;
  margin: 10px 0px;
  color: ${p => p.color};
`;

export const MainBtns = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 5px 40px;
`;

export const Grapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
`;

export const Option = styled.TouchableOpacity<{
  direction: string;
  justify: string;
  width: string;
  padding: string;
}>`
  display: flex;
  flex-direction: ${p => p.direction};
  align-items: center;
  justify-content: ${p => p.justify};
  width: ${p => p.width};
  padding: ${p => p.padding};
`;

export const Btn = styled.TouchableOpacity<{
  bg: string;
  width: string;
  margin: string;
  round?: boolean;
  height: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${p => p.width};
  height: ${p => p.height};
  margin: ${p => p.margin};
  background-color: ${p => p.bg};
  border-bottom-left-radius: ${p => (p.round ? '20px' : '4px')};
  border-bottom-right-radius: ${p => (p.round ? '20px' : '4px')};
  border-top-left-radius: ${p => (p.round ? '20px' : '4px')};
  border-top-right-radius: ${p => (p.round ? '20px' : '4px')};
`;
