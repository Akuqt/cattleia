import React, {useState} from 'react';
import {View, Modal, Button} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

interface Props {
  width: number;
  bg: string;
  show: boolean;
  setShow: (v: boolean) => void;
  onRead: (e: BarCodeReadEvent) => void;
}

export const QrReader: React.FC<Props> = props => {
  const [cameraSide, setCameraSide] = useState(false);
  return (
    <Modal
      animationType="slide"
      visible={props.show}
      onRequestClose={() => {
        props.setShow(false);
      }}>
      <QRCodeScanner
        onRead={e => {
          props.onRead(e);
          props.setShow(false);
        }}
        cameraStyle={{
          width: props.width,
        }}
        topViewStyle={{
          backgroundColor: props.bg,
        }}
        topContent={
          <View>
            <Button title="rotate" onPress={() => setCameraSide(c => !c)} />
          </View>
        }
        bottomViewStyle={{
          backgroundColor: props.bg,
        }}
        cameraType={cameraSide ? 'front' : 'back'}
        fadeIn
        showMarker
        markerStyle={{
          borderTopColor: 'red',
        }}
      />
    </Modal>
  );
};
