import React from 'react';
import {View} from 'react-native';
import {RankCard} from '../../../Components';

interface Props {}

export const Account: React.FC<Props> = props => {
  return (
    <View>
      <RankCard
        points={200}
        next={{
          name: 'Bronze',
          points: 300,
        }}
      />
    </View>
  );
};
