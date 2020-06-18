import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import {
  Button, NativeBase, Text, View,
} from 'native-base';
import { FlatList } from 'react-native';
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

const Content = styled(View)`
  padding: 0 20px;
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
      <Content>
        <CenteredButton bordered onPress={onAddComment} disabled={!commentAvailable}>
          <Text>Add comment</Text>
        </CenteredButton>
      </Content>

      <View>
        <FlatList
          data={comments.sort((item, itemTwo) => item.id - itemTwo.id)}
          renderItem={(data) => (
            <CommentView
              comment={data.item}
              onUserTab={onUserTabHandler}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default CommentManager;
