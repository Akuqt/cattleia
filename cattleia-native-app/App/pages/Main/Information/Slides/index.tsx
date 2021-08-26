import React from "react";
import { Info } from "../../../../Components/InfoViewer";

export const Slide1: React.FC<any> = ({ navigation }) => {
  const info = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.",
  ];

  return (
    <Info mb="20px" info={info} handler={() => navigation.navigate("Info2")} />
  );
};

export const Slide2: React.FC<any> = ({ navigation }) => {
  const info = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.",
  ];

  return (
    <Info
      mb="20px"
      info={info}
      handler={() => navigation.navigate("Info3")}
      back={{ show: true, handler: () => navigation.navigate("Info1") }}
    />
  );
};

export const Slide3: React.FC<any> = ({ navigation }) => {
  const info = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla harum odio perferendis odit explicabo obcaecati cumque eum aut, adipisci saepe officia cupiditate autem maiores dolor impedit sapiente minima cum.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, earum.",
  ];

  return (
    <Info
      mb="20px"
      info={info}
      handler={() => {}}
      back={{ show: true, handler: () => navigation.navigate("Info2") }}
      last
    />
  );
};
