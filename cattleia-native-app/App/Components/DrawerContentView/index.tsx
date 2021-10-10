import React from 'react';
import {Container} from './Elements';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

interface Props {
  header?: React.FC;
  body?: React.FC;
}

export const DrawerContentView: React.FC<DrawerContentComponentProps & Props> =
  props => {
    const Header = props.header as React.FC;
    const Body = props.body as React.FC;
    return (
      <Container>
        <DrawerContentScrollView {...props}>
          <Header />
        </DrawerContentScrollView>
        <DrawerContentScrollView {...props}>
          <Body />
        </DrawerContentScrollView>
      </Container>
    );
  };
