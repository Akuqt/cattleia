import React from 'react';
import {useSelector} from 'react-redux';
import {logo, logo2} from 'assets';
import {RootState} from '../../../../redux';
import {theme} from 'utils';
import {Info} from 'components/native';

export const Slide1: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const info = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
  ];

  return (
    <Info
      img={darkTheme ? logo2 : logo}
      colors={colors}
      mb="20px"
      info={info}
      next={() => navigation.navigate('Info2')}
      onSwipeLeft={() => navigation.navigate('Info2')}
    />
  );
};

export const Slide2: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const info = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
  ];

  return (
    <Info
      img={darkTheme ? logo2 : logo}
      colors={colors}
      mb="20px"
      info={info}
      next={() => navigation.navigate('Info3')}
      back={{show: true, handler: () => navigation.navigate('Info1')}}
      onSwipeLeft={() => navigation.navigate('Info3')}
      onSwipeRight={() => navigation.navigate('Info1')}
    />
  );
};

export const Slide3: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const info = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, earum.',
  ];

  return (
    <Info
      img={darkTheme ? logo2 : logo}
      colors={colors}
      mb="20px"
      info={info}
      next={() => {}}
      back={{show: true, handler: () => navigation.navigate('Info2')}}
      onSwipeRight={() => navigation.navigate('Info2')}
      last
    />
  );
};
