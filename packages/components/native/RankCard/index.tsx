import React from "react";
import { rankBase1, rankBase2 } from "assets";
import { Image } from "react-native";
import { User } from "types";
import {
  Circle,
  Container,
  Progress,
  Line,
  ProgressIndicator,
  Txt,
  Points,
  Information,
  Goal,
} from "./Elements";

interface Props {
  rank: User["rank"];
  indicatorColor: string;
  dark?: boolean;
}

export const RankCard: React.FC<Props> = (props) => {
  const progress = props.rank.points / props.rank.next.points;
  return (
    <Container>
      <Information>
        <Points>
          <Txt color="#808080" fs="12px">
            TOTAL POINTS
          </Txt>
          <Txt
            bold
            color={props.rank.color}
            fs="36px"
            style={{
              marginTop: 12,
              marginBottom: -18,
            }}
          >
            {props.rank.points}
          </Txt>
        </Points>
        <Goal>
          <Txt color="#808080" fs="13px" italic>
            Next Level
          </Txt>
          <Txt color={props.rank.next.color} fs="14px" italic>
            {props.rank.next.name.charAt(0).toUpperCase() +
              props.rank.next.name.slice(1)}
          </Txt>
          <Txt color="#808080" fs="12px" italic>
            {props.rank.next.points} Points
          </Txt>
        </Goal>
      </Information>
      <Progress>
        <Circle radius={12} color={props.rank.color} />
        <ProgressIndicator color={props.indicatorColor}>
          <Line
            progress={(progress > 1 ? 1 : progress) * 100 + "%"}
            color={props.rank.next.color}
          />
        </ProgressIndicator>
        <Circle radius={45} color={props.rank.next.color}>
          <Image
            source={props.dark ? rankBase2 : rankBase1}
            style={{
              width: 26,
              height: 30,
            }}
          />
        </Circle>
      </Progress>
    </Container>
  );
};
