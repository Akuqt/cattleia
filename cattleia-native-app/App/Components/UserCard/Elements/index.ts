import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 30px 10px 20px;
`;

export const AvatarContainer = styled.View<{bc: string}>`
  height: 130px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 65px;
  border-top-left-radius: 65px;
  border-bottom-right-radius: 65px;
  border-bottom-left-radius: 65px;
  border-width: 1px;
  border-color: ${p => p.bc};
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 60%;
  padding: 0px 10px 0px 20px;
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const EditIcon = styled.TouchableOpacity`
  width: 20%;
`;

export const NameContainer = styled.View`
  width: 80%;
`;

export const Name = styled.TextInput<{border?: boolean; fc: string}>`
  color: ${p => p.fc};
  font-size: 20px;
  font-weight: bold;
`;
