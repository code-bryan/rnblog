import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import {
  Button, NativeBase, Text, View,
} from 'native-base';
import CommentView from '../molecules/comments/CommentView';
import Comment from '../../models/Comment';
import User from '../../models/User';

interface Props {
  comments: Comment[];
  commentAvailable: boolean;
  onAddComment: Function;
  onCommentUserTap: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const Container = styled(View)`
  margin-bottom: 10px;
`;

const CenteredButton: React.FC<NativeBase.Button> = styled(Button)`
  width: 100%;
  justify-content: center;
`;

const CommentManager: React.FC<Props> = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    comments, commentAvailable, onAddComment, onCommentUserTap, onEdit, onDelete,
  } = props;

  const onUserTabHandler = useCallback((author: User) => {
    onCommentUserTap(author);
  }, []);

  const onEditHandler = useCallback((comment: Comment) => {
    if (onEdit) {
      onEdit(comment);
    }
  }, [onEdit]);

  const onDeleteHandler = useCallback((comment: Comment) => {
    if (onDelete) {
      const newComments = comments.filter((currentComment) => currentComment !== comment);
      onDelete(newComments);
    }
  }, [comments, onDelete]);

  return (
    <Container>
      <CenteredButton bordered onPress={onAddComment} disabled={!commentAvailable}>
        <Text>Add comment</Text>
      </CenteredButton>

      <Container>
        {comments.map((comment, index) => (
          <CommentView
            key={`${index}${comment.author.username}`}
            comment={comment}
            onUserTab={onUserTabHandler}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </Container>
    </Container>
  );
};

export default CommentManager;
