import React, {useState, useRef, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../utils';
import {Text} from 'react-native';
import {
  AvatarContainer,
  Container,
  EditIcon,
  InfoContainer,
  Name,
  NameContainer,
  TextContainer,
} from './Elements';

interface Props {
  name: string;
  avatar?: any;
  rank: string;
  theme: Theme['dark'] | Theme['light'];
}

export const UserCard: React.FC<Props> = props => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    edit && (inputRef.current as any).focus();
  }, [edit]);

  return (
    <Container>
      <AvatarContainer bc={props.theme.fontPrimary}>
        <Text>Avatar</Text>
      </AvatarContainer>
      <InfoContainer>
        <TextContainer>
          <NameContainer>
            <Name
              value={props.name}
              editable={edit}
              ref={inputRef}
              selectTextOnFocus
              border={edit}
              fc={props.theme.fontPrimary}
            />
          </NameContainer>
          <EditIcon
            onPress={() => {
              setEdit(c => !c);
            }}>
            {edit ? (
              <Ionicons
                name="checkmark"
                size={20}
                color={props.theme.primary}
              />
            ) : (
              <Ionicons name="pencil" size={18} color={props.theme.primary} />
            )}
          </EditIcon>
        </TextContainer>
        <Text style={{color: props.theme.fontPrimary}}>{props.rank}</Text>
      </InfoContainer>
    </Container>
  );
};
