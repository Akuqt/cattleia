import React from "react";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Container } from "./Elements";
import { IDrawer } from "./interfaces";

export const DrawerContentView: React.FC<
  DrawerContentComponentProps & IDrawer
> = (props) => {
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
