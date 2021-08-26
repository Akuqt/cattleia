import React, {useState} from 'react';
import {
  InputGroup,
  Input,
  IconP,
  Label,
  Help,
  HelpTxt,
  PolicyTxt,
  Policy,
  PolicyTxt2,
} from '../Elements';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {IPassword} from './interfaces';
import {Alert} from 'react-native';
import {theme} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const PasswordInput: React.FC<IPassword> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const [show, setShow] = useState(true);
  const [icon, setIcon] = useState({
    name: 'eye-off-outline',
    active: true,
  });
  return (
    <InputGroup>
      <Label colors={colors}>Password</Label>
      <IconP
        onPress={() => {
          setShow(c => !c);
          icon.active
            ? setIcon({name: 'eye', active: false})
            : setIcon({name: 'eye-off', active: true});
        }}>
        <IonIcons name={icon.name} color="#202020" size={30} />
      </IconP>
      <Input colors={colors} style={{borderRadius: 4}} secureTextEntry={show} />
      {props.help && (
        <Help onPress={props.handler}>
          <HelpTxt colors={colors}>Have you forgotten your password?</HelpTxt>
        </Help>
      )}
      {props.policy && (
        <Policy>
          <PolicyTxt colors={colors}>
            By clicking sing up, you are indicating that you have read and
          </PolicyTxt>
          <PolicyTxt colors={colors}>
            acknowledge the{' '}
            {
              <PolicyTxt2 colors={colors} onPress={() => Alert.alert('Terms')}>
                terms of service
              </PolicyTxt2>
            }{' '}
            and{' '}
            {
              <PolicyTxt2
                colors={colors}
                onPress={() => Alert.alert('Privacy')}>
                privacy notice
              </PolicyTxt2>
            }
            .
          </PolicyTxt>
        </Policy>
      )}
    </InputGroup>
  );
};
