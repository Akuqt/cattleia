import React from 'react';
import {useSelector} from 'react-redux';
import {View, Linking, Text, ScrollView} from 'react-native';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';
import {FeedCard} from '../../../Components';

export const Home: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Cattleia's Feed
          </Text>
        </View>
        <FeedCard
          title="Lorem Ipsum"
          theme={colors}
          content={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non Lorem.`}
          img={
            'https://images.pexels.com/photos/698275/pexels-photo-698275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=94'
          }
          more={() => Linking.openURL('https://google.com')}
        />
        <FeedCard
          title="Lorem Ipsum"
          theme={colors}
          content={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non Lorem.`}
          img={
            'https://images.pexels.com/photos/737586/pexels-photo-737586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          }
          more={() => Linking.openURL('https://google.com')}
        />
        <FeedCard
          title="Lorem Ipsum"
          theme={colors}
          content={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non Lorem.`}
          img={
            'https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          }
          more={() => Linking.openURL('https://google.com')}
        />
        <FeedCard
          title="Lorem Ipsum"
          theme={colors}
          content={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non Lorem.`}
          img={
            'https://images.pexels.com/photos/3264706/pexels-photo-3264706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          }
          more={() => Linking.openURL('https://google.com')}
        />
        <FeedCard
          title="Lorem Ipsum"
          theme={colors}
          content={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non Lorem.`}
          img={
            'https://images.pexels.com/photos/1617294/pexels-photo-1617294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          }
          more={() => Linking.openURL('https://google.com')}
        />
      </View>
    </ScrollView>
  );
};
