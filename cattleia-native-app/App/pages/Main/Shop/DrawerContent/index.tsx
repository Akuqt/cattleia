import React from "react";
import { Btn, Buttons } from "./Elements";
import { Text } from "react-native";
import { theme } from "../../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export const Header: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Buttons>
      <Btn>
        <Text style={{ fontWeight: "bold", color: colors.fontPrimary }}>
          CLEAR
        </Text>
      </Btn>
    </Buttons>
  );
};

export const Body: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Text style={{ fontWeight: "bold", color: colors.fontPrimary }}>
      CONTENT
    </Text>
  );
};
