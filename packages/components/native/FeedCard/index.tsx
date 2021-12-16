import React, { useState } from "react";
import { Theme } from "utils";
import { Container, Img, Txt } from "./Elements";
import IonIcons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

interface Props {
  theme: Theme["dark"] | Theme["light"];
  title: string;
  content: string;
  img: string;
  more?: () => void;
}

export const FeedCard: React.FC<Props> = (props) => {
  const [love, setLove] = useState(false);

  return (
    <Container
      align="center"
      justify="center"
      direction="column"
      pt="10px"
      ps="10px"
      width="100%"
      mt="10px"
      mb="10px"
      bg={props.theme.gray + "1f"}
      round
    >
      <Container
        align="center"
        justify="space-between"
        direction="row"
        width="100%"
        pt="0px"
      >
        <Txt fs="16px" color={props.theme.fontPrimary} bold>
          {props.title}
        </Txt>
        <IonIcons
          name="ellipsis-horizontal-outline"
          color={props.theme.fontPrimary}
          size={20}
        />
      </Container>
      <Container
        align="center"
        justify="space-between"
        direction="row"
        width="100%"
        pt="10px"
      >
        <Container
          align="center"
          justify="space-between"
          direction="row"
          width="37%"
          pt="0px"
        >
          <Img source={{ uri: props.img }} />
        </Container>

        <Container
          align="center"
          justify="space-between"
          direction="row"
          width="63%"
          pt="0px"
        >
          <Txt
            fs="14px"
            color={props.theme.fontPrimary}
            style={{
              textAlign: "justify",
            }}
          >
            {props.content}
          </Txt>
        </Container>
      </Container>
      <Container
        align="center"
        justify="space-between"
        direction="row"
        width="100%"
        pt="10px"
        mb="10px"
      >
        <TouchableOpacity
          onPress={() => {
            setLove((c) => !c);
          }}
        >
          <IonIcons
            name={love ? "heart" : "heart-outline"}
            color={props.theme.primary}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.more}>
          <Container
            direction="row"
            justify="space-between"
            align="center"
            pt="0px"
          >
            <Txt
              fs="16px"
              color={props.theme.fontPrimary}
              style={{ marginRight: 6 }}
            >
              Read More
            </Txt>
            <IonIcons
              name="newspaper-outline"
              color={props.theme.primary}
              size={20}
            />
          </Container>
        </TouchableOpacity>
      </Container>
    </Container>
  );
};
