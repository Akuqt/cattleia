import React from 'react';
import {Container} from './Elements';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

interface Props {
  body?: React.FC;
}

export const DrawerContentView: React.FC<DrawerContentComponentProps & Props> =
  props => {
    const Body = props.body as React.FC;
    return (
      <Container>
        <DrawerContentScrollView
          {...props}
          style={{width: '100%', height: '100%'}}>
          <Body />
        </DrawerContentScrollView>
      </Container>
    );
  };
