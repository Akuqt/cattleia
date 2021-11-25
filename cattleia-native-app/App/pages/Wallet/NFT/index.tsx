import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, ScrollView, Text} from 'react-native';
import {useBackHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {NFTCard} from '../../../Components';
import {theme} from '../../../utils';
import {Get} from '../../../services';

type ParamList = {
  MainWallet: undefined;
  NFT: undefined;
};

interface Response {
  name: string;
  image: string;
  description: string;
}

type Props = NativeStackScreenProps<ParamList, 'NFT'>;

export const NFT: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const colors = darkTheme ? theme.dark : theme.light;

  const [nfts, setNfts] = useState<Response[]>([]);

  useBackHandler(() => {
    navigation.navigate('MainWallet');
  });

  useEffect(() => {
    (async () => {
      const data: Response[] = [];
      for (const nft of user.account.balance.nft.tokens) {
        const res = await Get<Response, {}, {}>(`/nft/metadata/${nft}`);
        data.push(res.data);
      }
      setNfts(data);
    })();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        height: '100%',
        flexGrow: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: 30,
          marginBottom: 10,
          paddingRight: 30,
        }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          My NFTs
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {user.account.balance.nft.total}
        </Text>
      </View>
      {nfts.map((e, i) => (
        <NFTCard
          theme={colors}
          key={i}
          name={e.name}
          description={e.description}
          img={e.image}
        />
      ))}
    </ScrollView>
  );
};
