import React, { useState, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SvgImage from "../RemoteSvg";
import { Theme } from "utils";
import { Text } from "react-native";
import {
  AvatarContainer,
  Container,
  EditIcon,
  InfoContainer,
  Name,
  NameContainer,
  TextContainer,
} from "./Elements";
import { User } from "types";
import { TextInput } from "react-native";
interface Props {
  name: string;
  avatar?: any;
  rank: User["rank"];
  theme: Theme["dark"] | Theme["light"];
  onUpdate?: (name: string) => void;
}

export const UserCard: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.name);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    edit && inputRef.current?.focus();
  }, [edit]);

  return (
    <Container>
      <AvatarContainer bc={props.theme.fontPrimary}>
        <SvgImage
          source={{ uri: props.avatar }}
          style={{ width: 60, height: 60 }}
        />
      </AvatarContainer>
      <InfoContainer>
        <TextContainer>
          <NameContainer>
            <Name
              value={name}
              editable={edit}
              // @ts-ignore
              ref={inputRef}
              selectTextOnFocus
              border={edit}
              fc={props.theme.fontPrimary}
              onChange={(e) => {
                setName(e.nativeEvent.text);
              }}
              onEndEditing={() => {
                props.onUpdate && props.onUpdate(name);
                setEdit(false);
              }}
            />
          </NameContainer>
          <EditIcon
            onPress={() => {
              setEdit((c) => !c);
            }}
          >
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
        <Text style={{ color: props.theme.fontPrimary }}>
          {props.rank.name.charAt(0).toUpperCase() + props.rank.name.slice(1)}
        </Text>
      </InfoContainer>
    </Container>
  );
};
