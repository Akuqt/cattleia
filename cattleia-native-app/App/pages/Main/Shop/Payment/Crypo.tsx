import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {Txt} from '../Elements';

type Props = NativeStackScreenProps<
  {Crypto: {ids: string[]; total: number}},
  'Crypto'
>;

export const Crypto: React.FC<Props> = ({
  navigation,
  route: {
    params: {ids, total},
  },
}) => {
  return (
    <View>
      <Text>{total}</Text>

      {ids.map(j => (
        <Txt key={j} color="#000" fs="14px">
          {j}
        </Txt>
      ))}
    </View>
  );
};
