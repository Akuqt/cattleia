import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, Theme} from '../../utils';
import {Container, Content, Group, Header, Option, Title} from './Elements';

interface Props {
  theme: Theme['dark'] | Theme['light'];
  placeholder: string;
  options: {name: string; value: string}[];
  onChange: (a: string) => void;
  margin: string;
}

export const DropDawnPicker: React.FC<Props> = props => {
  const [show, setShow] = useState(false);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <Container m={props.margin} bb={false} bt={false}>
        <Header onPress={() => setShow(c => !c)}>
          <Group>
            <Title color={props.theme.fontPrimary} fs="15px">
              {props.placeholder}
            </Title>
          </Group>
          {show ? (
            <Ionicons
              name={icons.chevronUp.outline}
              color={props.theme.fontPrimary}
              size={24}
            />
          ) : (
            <Ionicons
              name={icons.chevronDown.outline}
              color={props.theme.fontPrimary}
              size={24}
            />
          )}
        </Header>

        {show && (
          <Content>
            {props.options?.map((op, i) => (
              <Option
                key={i}
                onPress={() => {
                  props.onChange(op.value);
                  setShow(c => !c);
                }}>
                <Text key={i * 2 + 1}>{op.name}</Text>
              </Option>
            ))}
          </Content>
        )}
      </Container>
    </View>
  );
};