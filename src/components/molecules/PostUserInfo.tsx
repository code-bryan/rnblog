import React, { useEffect, useState } from 'react';
import {
  Button, Icon, View,
} from 'native-base';
import styled from 'styled-components/native';
import moment from 'moment';
import User from '../../models/User';
import CircleImage from '../atoms/images/CircleImage';
import DateFormats from '../../constants/DateFormats';

interface Props {
  author: User;
  publishDate: string;
}

const AuthorName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 3px;
`;

const PublishDate = styled.Text`
  font-size: 15px;
  margin-left: 15px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostUserInfoContainer = styled(Container)`
  margin: 20px 0;
  justify-content: space-between;
`;

const IconStyled = styled(Icon)`
  color: black;
  font-size: 28px;
`;

const PostUserInfo: React.FC<Props> = (props) => {
  const { author, publishDate } = props;
  const [date, setDate] = useState('');

  useEffect(() => {
    const newDate = moment(publishDate).format(DateFormats.screen);
    setDate(newDate);
  }, [publishDate, setDate]);

  return (
    <PostUserInfoContainer>
      <Container>
        { props.author.avatar.length > 0 && (
          <CircleImage source={{ uri: author.avatar }} width={50} height={50} />
        ) }
        <View>
          <AuthorName>
            {author.name}
            {' '}
            {author.lastname}
          </AuthorName>
          <PublishDate>{date}</PublishDate>
        </View>
      </Container>

      <Button transparent>
        <IconStyled name="ios-arrow-forward" />
      </Button>
    </PostUserInfoContainer>
  );
};

export default PostUserInfo;
