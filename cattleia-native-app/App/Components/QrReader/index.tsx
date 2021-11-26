import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  width: number;
  bg: string;
  show: boolean;
  setShow: (v: boolean) => void;
  onRead: (e: BarCodeReadEvent) => void;
  border: string;
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
            <TouchableOpacity onPress={() => setCameraSide(c => !c)}>
              <Ionicons
                name="camera-reverse-outline"
                color={props.border}
                size={50}
              />
            </TouchableOpacity>
          </View>
        }
        bottomViewStyle={{
          backgroundColor: props.bg,
        }}
        cameraType={cameraSide ? 'front' : 'back'}
        fadeIn
        showMarker
        markerStyle={{
          borderColor: props.border,
        }}
      />
    </Modal>
  );
};
