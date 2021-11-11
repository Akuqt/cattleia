import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  TextInputChangeEventData,
  NativeSyntheticEvent,
  KeyboardTypeOptions,
  TextInputKeyPressEventData,
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
import Clipboard from '@react-native-community/clipboard';

interface Props {
  handler: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    txt?: string,
  ) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  format?: (txt: string) => string;
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
  labelFontColor: string;
  lableFs?: string;
  length?: number;
  aling?: 'center' | 'left' | 'right';
  placeholder?: string;
  clipboard?: boolean;
  disabled?: boolean;
  differValue?: boolean;
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

  const [text, setText] = useState('');

  // useEffect(() => {
  //   if (props.differValue) props.handler(null as any, text);
  // }, [text, props.differValue]);

  return (
    <Container width={props.width} mg={props.margin}>
      <Label2 color={props.labelFontColor} fs={props.lableFs}>
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
      {props.clipboard && props.type !== 'Password' && (
        <IconP
          onPress={async () => {
            const clip = await Clipboard.getString();

            if (!!props.format) {
              setText(props.format(clip));
              props.handler(null as any, clip);
            } else {
              props.handler(null as any, clip);
            }
          }}>
          <IonIcons name="clipboard-outline" color="#202020" size={30} />
        </IconP>
      )}
      <Input2
        bg={props.bg}
        color={props.fontColor}
        width={props.width}
        height={props.height}
        fs={props.fs}
        placeholder={props.placeholder}
        placeholderTextColor="#808080"
        style={{borderRadius: 5, textAlign: props.aling || 'left'}}
        secureTextEntry={show && props.type === 'Password'}
        editable={!!!props.disabled}
        value={props.differValue ? text : props.value}
        keyboardType={getKeyboardType(props.type)}
        maxLength={props.length || 20}
        onKeyPress={e => {
          // if (!props.differValue) {
          //   if (e.nativeEvent.key === 'Backspace') {
          //     setText(c => c.substring(0, c.length - 1));
          //   }
          // }

          props.onKeyPress && props.onKeyPress(e);
        }}
        onChange={e => {
          if (props.format) setText(props.format(e.nativeEvent.text));
          else props.handler(e);

          if (props.differValue) {
            props.handler(e);
          } else {
            props.format && props.handler(e, props.format(e.nativeEvent.text));
          }
        }}
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
