import React, { useEffect, useState } from 'react';
import {
  Button, Icon, View,
} from 'native-base';
import styled from 'styled-components/native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import User from '../../models/User';
import CircleImage from '../atoms/images/CircleImage';
import DateFormats from '../../constants/DateFormats';

interface Props {
  author: User;
  publishDate: string;
  onUserTab: Function,
  arrow?: boolean
}

const AuthorName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
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

const PostUserInfoContainer = styled(TouchableOpacity)`
  margin: 20px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconStyled = styled(Icon)`
  color: black;
  font-size: 28px;
`;

const PostUserInfo: React.FC<Props> = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    author, publishDate, onUserTab, arrow,
  } = props;
  const [date, setDate] = useState('');

  useEffect(() => {
    const newDate = moment(publishDate).format(DateFormats.screen);
    setDate(newDate);
  }, [publishDate, setDate]);

  return (
    <PostUserInfoContainer activeOpacity={0.6} onPress={onUserTab}>
      <Container>
        { props.author.avatar.length > 0 && (
          <CircleImage source={{ uri: author.avatar }} width={40} height={40} />
        ) }
        <View>
          <AuthorName>{`${author.name} ${author.lastname}`}</AuthorName>
          { arrow && (
            <PublishDate>{date}</PublishDate>
          ) }
        </View>
      </Container>

      { arrow && (
        <Button transparent onPress={onUserTab}>
          <IconStyled name="ios-arrow-forward" />
        </Button>
      ) }

      { !arrow && (
        <PublishDate>{date}</PublishDate>
      ) }
    </PostUserInfoContainer>
  );
};

export default PostUserInfo;
