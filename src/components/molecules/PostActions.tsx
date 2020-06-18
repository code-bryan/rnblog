import React, { useCallback } from 'react';
import { NativeBase } from 'native-base';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import LikesButton from '../atoms/button/LikesButton';
import CommentsButton from '../atoms/button/CommentsButton';
import Comment from '../../models/Comment';
import User from '../../models/User';

interface Props {
  likes: string[];
  comments: Comment[];
  onLikePress?: Function;
}

const Container: React.FC<NativeBase.View> = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 35%;
  margin-bottom: 20px;
  margin-left: 7px;
`;

const PostActions: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onLikePress, likes, comments } = props;
  const user: User = useSelector((state: any) => state.auth.user);

  // eslint-disable-next-line react/prop-types
  const hasLiked = likes.find((userId) => userId === user.uid);

  const onLikePressHandler = useCallback(() => {
    if (onLikePress) {
      onLikePress();
    }
  }, [likes, user, onLikePress]);

  return (
    <Container>
      {/* eslint-disable-next-line react/prop-types */}
      <LikesButton likes={likes.length} onPress={onLikePressHandler} active={!!hasLiked} />
      <CommentsButton comments={comments} />
    </Container>
  );
};

export default PostActions;
