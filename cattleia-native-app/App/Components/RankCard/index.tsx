import React from 'react';
import {Image} from 'react-native';
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
} from './Elements';

interface Props {
  points: number;
  next: {
    name: string;
    points: number;
  };
}

export const RankCard: React.FC<Props> = props => {
  return (
    <Container>
      <Information>
        <Points>
          <Txt color="#808080" fs="15px">
            TOTAL POINTS
          </Txt>
          <Txt
            bold
            color={'#e885b6'}
            fs="36px"
            style={{
              marginTop: 8,
              marginBottom: -20,
            }}>
            {props.points}
          </Txt>
        </Points>
        <Goal>
          <Txt color="#808080" fs="13px" italic>
            Next Level
          </Txt>
          <Txt color="#e885b6" fs="14px" italic>
            {props.next.name}
          </Txt>
          <Txt color="#808080" fs="12px" italic>
            {props.next.points} Points
          </Txt>
        </Goal>
      </Information>
      <Progress>
        <Circle radius={12} />
        <ProgressIndicator>
          <Line
            progress={(props.points / props.next.points) * 100 + '%'}
            color={'green'}
          />
        </ProgressIndicator>
        <Circle radius={45}>
          <Image
            source={{uri: 'asset:/images/rank-base.png'}}
            style={{
              width: 25,
              height: 29,
            }}
          />
        </Circle>
      </Progress>
    </Container>
  );
};
