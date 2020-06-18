import React from 'react';
import {
  Icon, NativeBase,
} from 'native-base';
import styled from 'styled-components/native';
import Comment from '../../../models/Comment';

interface Props {
  comments: Comment[];
}

const Container: React.FC<NativeBase.View> = styled.View`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: row;
`;

const CommentsText: React.FC<NativeBase.Text> = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

const CommentIcon: React.FC<NativeBase.Icon> = styled(Icon)`
  color: #ccc;
`;

const CommentsButton: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { comments } = props;

  return (
    <Container>
      <CommentIcon name="ios-chatboxes" type="Ionicons" />
      <CommentsText>{comments.length}</CommentsText>
    </Container>
  );
};

export default CommentsButton;
