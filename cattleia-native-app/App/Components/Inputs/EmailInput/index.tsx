import React from "react";

import { InputGroup, Input, Label } from "../Elements";

import { theme } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const EmailInput: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <InputGroup>
      <Label colors={colors}>Email</Label>
      <Input
        colors={colors}
        style={{ borderRadius: 4 }}
        keyboardType="email-address"
      />
    </InputGroup>
  );
};
