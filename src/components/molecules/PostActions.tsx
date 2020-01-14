import React from 'react';
import { NativeBase } from 'native-base';
import styled from 'styled-components/native';
import LikesButton from '../atoms/button/LikesButton';
import CommentsButton from '../atoms/button/CommentsButton';
import Comment from '../../models/Comment';

const Container: React.FC<NativeBase.View> = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 35%;
  margin-bottom: 20px;
  margin-left: 7px;
`;

const PostActions: React.FC = (props) => {
  const comments: Comment[] = [
    {
      id: 1,
      body: 'Hi',
      author: 1,
    },
  ];

  const likes: string[] = [
    '1',
  ];

  return (
    <Container>
      <LikesButton likes={likes} />
      <CommentsButton comments={comments} />
    </Container>
  );
};

export default PostActions;
