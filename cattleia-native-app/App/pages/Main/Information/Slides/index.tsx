import React from 'react';
import {Info} from '../../../../Components/InfoViewer';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';

export const Slide1: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const info = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
  ];

  return (
    <Info
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
