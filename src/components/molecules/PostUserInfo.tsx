import React from 'react';
import { Text, View } from 'native-base';
import styled from 'styled-components/native';
import User from '../../models/User';
import CircleImage from '../atoms/images/CircleImage';

interface Props {
  author: User
}

const AuthorName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 15px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

const PostUserInfo: React.FC<Props> = (props) => {
  const { author } = props;

  return (
    <Container>
      { props.author.avatar.length > 0 && (
        <CircleImage source={{ uri: author.avatar }} width={40} height={40} />
      ) }
      <AuthorName>
        {author.name}
        {' '}
        {author.lastname}
      </AuthorName>
    </Container>
  );
};

export default PostUserInfo;
