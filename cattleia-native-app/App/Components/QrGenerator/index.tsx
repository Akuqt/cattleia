import React from 'react';
import QrGen from 'react-native-qrcode-svg';
import {Modal, View} from 'react-native';

interface Props {
  show: boolean;
  setShow: (v: boolean) => void;
  color: string;
  data: object;
  bg: string;
}

export const QrGenerator: React.FC<Props> = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.show}
      onRequestClose={() => {
        props.setShow(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.bg,
        }}>
        <QrGen
          value={JSON.stringify(props.data, null, 2)}
          size={300}
          logoBackgroundColor="transparent"
          color={props.color}
          backgroundColor={props.bg}
        />
      </View>
    </Modal>
  );
};
