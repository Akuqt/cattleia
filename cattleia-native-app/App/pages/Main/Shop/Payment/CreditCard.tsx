import React, {useEffect, useState} from 'react';
import {ScrollView, ActivityIndicator, ToastAndroid} from 'react-native';
import {
  removeCartProduct,
  RootState,
  addHistory,
  saveUser,
} from '../../../../redux';
import {Txt, Btn, Container, Header, Logo, Img} from '../Elements';
import {useBackHandler, useInputHandler} from '../../../../hooks';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {moneyFormat, theme} from '../../../../utils';
import {Get, Post} from '../../../../services';
import {Plain} from '../../../../Components';
import {
  StripeProvider,
  useStripe,
  CardField,
} from '@stripe/stripe-react-native';

type Props = NativeStackScreenProps<
  {
    CreditCard: {ids: string[]; total: number};
    Shop: undefined;
    PaymentType: {id: string};
  },
  'CreditCard'
>;

export const CreditCard: React.FC<Props> = ({
  navigation,
  route: {
    params: {ids, total},
  },
}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const colors = darkTheme ? theme.dark : theme.light;

  const {confirmPayment} = useStripe();
  const [publishableKey, setPublishableKey] = useState('');
  const [key, setKey] = useState('');

  const user = useSelector((state: RootState) => state.userReducer.user);

  const {handler, values} = useInputHandler({
    name: user.name,
    email: user.email,
  });

  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useBackHandler(() => {
    navigation.navigate('PaymentType', {id: ids.length === 1 ? ids[0] : '-1'});
  });

  useEffect(() => {
    (async () => {
      const res_t = await Get<{publishableKey: string}, {}>(
        '/payment/get-publishable-key',
      );
      setPublishableKey(res_t.data.publishableKey);
      const res = await Post<{clientSecret: string}, {}, {ok: boolean}>(
        '/payment/create-payment-intent',
        {
          amount: total * 100,
        },
      );
      if (res.data.ok) {
        setKey(res.data.clientSecret);
      }
    })();
  }, [total]);

  const handleSheet = async () => {
    setLoader(true);
    const {paymentIntent, error} = await confirmPayment(key, {
      type: 'Card',
      billingDetails: {
        email: values.email,
        name: values.name,
      },
    });

    if (!error) {
      ToastAndroid.show(
        `Billed for ${moneyFormat((paymentIntent?.amount || 0) / 100)}`,
        ToastAndroid.SHORT,
      );
      setLoading(false);
      setLoader(false);

      ids.forEach(id => {
        dispatch(removeCartProduct({id}));
      });

      const history = {
        date: new Date().toLocaleString(),
        method: 'Credit Card',
        total,
      };

      dispatch(addHistory(history));

      await Post('/history/add', history, user.token);

      const points = (total * 2) / 1000;

      const res_ = await Post<
        {rank: typeof user.rank},
        {error: any},
        {ok: boolean}
      >('/rank/update', {points}, user.token);

      dispatch(
        saveUser({
          ...user,
          rank: res_.data.rank,
        }),
      );

      setTimeout(() => {
        navigation.navigate('Shop');
      }, 1000);
    } else {
      ToastAndroid.show(`Error - ${error.message}`, ToastAndroid.SHORT);
      setLoading(true);
      setLoader(false);
    }
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier">
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container
          direction="column"
          align="center"
          justify="flex-start"
          pt="20px"
          ps="20px"
          full>
          <Header>
            <Logo mb="20px">
              <Img
                source={{
                  uri: darkTheme
                    ? 'asset:/images/logo2.png'
                    : 'asset:/images/logo.png',
                }}
              />
            </Logo>
          </Header>

          <Plain
            width="100%"
            height="40px"
            bg={colors.inputBg}
            fontColor={colors.fontPrimaryInput}
            labelFontColor={colors.fontPrimary}
            fs="16px"
            margin="15px 0px"
            label="Email *"
            type="Email"
            value={values.email}
            lableFs="15px"
            handler={handler('email')}
          />
          <Plain
            width="100%"
            height="40px"
            bg={colors.inputBg}
            fontColor={colors.fontPrimaryInput}
            labelFontColor={colors.fontPrimary}
            fs="16px"
            margin="15px 0px 20px 0px"
            label="Name *"
            lableFs="15px"
            type="Text"
            value={values.name}
            handler={handler('name')}
          />
          <Container
            direction="column"
            justify="center"
            align="flex-start"
            pt="7px"
            width="100%">
            <Txt color={colors.fontPrimary} fs="14px" style={{marginBottom: 4}}>
              Card *
            </Txt>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: 'XXXX XXXX XXXX XXXX',
              }}
              cardStyle={{
                backgroundColor: colors.inputBg,
                textColor: colors.fontPrimaryInput,
                placeholderColor: colors.gray,
                borderRadius: 5,
              }}
              style={{
                width: '100%',
                height: 40,
              }}
            />
          </Container>
          <Btn
            disabled={values.email === '' || values.name === ''}
            height="40px"
            margin="50px 0px"
            width="200px"
            bg={loading ? colors.primary : 'green'}
            onPress={handleSheet}>
            {loader && (
              <ActivityIndicator
                color={colors.fontPrimaryInput}
                size="small"
                style={{
                  marginRight: 10,
                }}
              />
            )}
            <Txt fs="16px" color={colors.fontPrimaryInput}>
              {loading
                ? loader
                  ? 'Processing...'
                  : `Pay ${moneyFormat(total)}`
                : 'Success!'}
            </Txt>
          </Btn>
        </Container>
      </ScrollView>
    </StripeProvider>
  );
};
