import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  TextInputChangeEventData,
  NativeSyntheticEvent,
  KeyboardTypeOptions,
} from 'react-native';
import {
  Container,
  Input2,
  IconP,
  Label2,
  Help,
  HelpTxt,
  PolicyTxt,
  Policy,
  PolicyTxt2,
} from '../Elements';

interface Props {
  handler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: string;
  label?: string;
  password?: {
    help?: {
      color: string;
      handler: () => void;
    };
    policy?: {
      color1: string;
      color2: string;
      terms: () => void;
      notice: () => void;
    };
  };
  type: 'Password' | 'Text' | 'Number' | 'Email';
  width: string;
  height: string;
  margin: string;
  fs: string;
  bg: string;
  fontColor: string;
  lableFs?: string;
  length?: number;
  aling?: 'center' | 'left' | 'right';
}

const getKeyboardType = (prop: Props['type']): KeyboardTypeOptions => {
  switch (prop) {
    case 'Text':
      return 'default';
    case 'Password':
      return 'default';
    case 'Email':
      return 'email-address';
    case 'Number':
      return 'number-pad';
  }
};

export const Plain: React.FC<Props> = props => {
  const [show, setShow] = useState(true);
  const [icon, setIcon] = useState({
    name: 'eye-off',
    active: true,
  });
  return (
    <Container width={props.width} mg={props.margin}>
      <Label2 color={props.fontColor} fs={props.lableFs}>
        {props.label}
      </Label2>
      {props.type === 'Password' && (
        <IconP
          onPress={() => {
            setShow(c => !c);
            icon.active
              ? setIcon({name: 'eye', active: false})
              : setIcon({name: 'eye-off', active: true});
          }}>
          <IonIcons name={icon.name} color="#202020" size={30} />
        </IconP>
      )}
      <Input2
        bg={props.bg}
        color={props.fontColor}
        width={props.width}
        height={props.height}
        fs={props.fs}
        style={{borderRadius: 5, textAlign: props.aling || 'left'}}
        secureTextEntry={show && props.type === 'Password'}
        onChange={props.handler}
        value={props.value}
        keyboardType={getKeyboardType(props.type)}
        maxLength={props.length || 20}
      />
      {props.password?.help && (
        <Help onPress={props.password?.help.handler}>
          <HelpTxt color={props.password.help.color}>
            Have you forgotten your password?
          </HelpTxt>
        </Help>
      )}
      {props.password?.policy && (
        <Policy>
          <PolicyTxt color={props.password.policy.color1}>
            By clicking sing up, you are indicating that you have read and
          </PolicyTxt>
          <PolicyTxt color={props.password.policy.color1}>
            acknowledge the{' '}
            {
              <PolicyTxt2
                color={props.password.policy.color2}
                onPress={props.password.policy.terms}>
                terms of service
              </PolicyTxt2>
            }{' '}
            and{' '}
            {
              <PolicyTxt2
                color={props.password.policy.color2}
                onPress={props.password.policy.notice}>
                privacy notice
              </PolicyTxt2>
            }
            .
          </PolicyTxt>
        </Policy>
      )}
    </Container>
  );
};
