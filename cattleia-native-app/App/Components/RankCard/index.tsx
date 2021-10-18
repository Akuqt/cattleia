import React from 'react';
import {Image} from 'react-native';
import {User} from '../../types';
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
  rank: User['rank'];
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
            color={props.rank.color}
            fs="36px"
            style={{
              marginTop: 8,
              marginBottom: -20,
            }}>
            {props.rank.points}
          </Txt>
        </Points>
        <Goal>
          <Txt color="#808080" fs="13px" italic>
            Next Level
          </Txt>
          <Txt color={props.rank.next.color} fs="14px" italic>
            {props.rank.next.name}
          </Txt>
          <Txt color="#808080" fs="12px" italic>
            {props.rank.next.points} Points
          </Txt>
        </Goal>
      </Information>
      <Progress>
        <Circle radius={12} />
        <ProgressIndicator>
          <Line
            progress={(props.rank.points / props.rank.next.points) * 100 + '%'}
            color={props.rank.next.color}
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
