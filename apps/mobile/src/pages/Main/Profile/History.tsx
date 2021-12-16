import React, {useEffect} from 'react';
import {View, Text, ToastAndroid, ScrollView} from 'react-native';
import {moneyFormat, theme as colors} from 'utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, setHistory} from '../../../redux';
import {Accordion} from 'components/native';
import {Get} from 'services';

export const History: React.FC = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.dark)
    ? colors.dark
    : colors.light;

  const history = useSelector(
    (state: RootState) => state.historyReducer.history,
  );

  const user = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await Get<
        {
          history: typeof history;
        },
        {
          error: {
            message: string;
            code: number;
          };
        },
        {ok: boolean}
      >('/history/get', user.token);

      if (res.data.ok) {
        dispatch(setHistory(res.data.history));
      } else {
        ToastAndroid.show(
          `Erorr: ${res.data.error.message} [${res.data.error.code}]`,
          ToastAndroid.SHORT,
        );
      }
    })();
  }, [dispatch, user.token]);
  return (
    <ScrollView>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        {history.length > 0 ? (
          history.map((h, i) => (
            <Accordion
              title={`Date: ${h.date}`}
              key={i}
              margin="10px 0px"
              theme={theme}>
              <Text style={{color: theme.fontPrimary}}>Method: {h.method}</Text>
              <Text style={{color: theme.fontPrimary, marginTop: 10}}>
                Total: {moneyFormat(h.total)}
              </Text>
            </Accordion>
          ))
        ) : (
          <Text
            style={{
              color: theme.fontPrimary,
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 40,
            }}>
            There's no history to show!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
