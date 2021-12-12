import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-community/clipboard';
import {getKeyboardType, Props} from './util';
import {
  PolicyTxt2,
  PolicyTxt,
  Container,
  HelpTxt,
  Input2,
  Label2,
  Policy,
  IconP,
  Help,
} from '../Elements';

export const Plain: React.FC<Props> = props => {
  const [show, setShow] = useState(true);
  const [icon, setIcon] = useState({
    name: 'eye-off',
    active: true,
  });

  const [text, setText] = useState('');

  useEffect(() => {
    if (props.txt) {
      setText(props.format ? props.format(props.txt) : props.txt);
      props.handler(null as any, props.txt);
    }
  }, [props]);

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

            if (props.format) {
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
        editable={!props.disabled}
        value={props.differValue ? text : props.value}
        keyboardType={getKeyboardType(props.type)}
        maxLength={props.length || 20}
        onKeyPress={e => {
          props.onKeyPress && props.onKeyPress(e);
        }}
        onChange={e => {
          if (props.format) {
            setText(props.format(e.nativeEvent.text));
          } else {
            props.handler(e);
          }

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
