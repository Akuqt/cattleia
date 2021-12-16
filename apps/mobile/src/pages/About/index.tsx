import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {theme} from 'utils';
import {Info} from 'components/native';
import {logo, logo2} from 'assets';

const info = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.',
];

export const About: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Info
      img={darkTheme ? logo2 : logo}
      colors={colors}
      last
      mb="20px"
      info={info}
    />
  );
};
