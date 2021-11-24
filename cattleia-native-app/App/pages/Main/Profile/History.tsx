import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Accordion} from '../../../Components';
import {RootState} from '../../../redux';
import {moneyFormat, theme as colors} from '../../../utils';

export const History: React.FC = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.dark)
    ? colors.dark
    : colors.light;

  const history = useSelector(
    (state: RootState) => state.historyReducer.history,
  );
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      {history.map((h, i) => (
        <Accordion
          title={`Date: ${h.date}`}
          key={i}
          margin="10px 0px"
          theme={theme}>
          <Text style={{color: theme.fontPrimary}}>Metod: {h.method}</Text>
          <Text style={{color: theme.fontPrimary}}>
            Total: {moneyFormat(h.total)}
          </Text>
        </Accordion>
      ))}
    </View>
  );
};
