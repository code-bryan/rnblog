import React, { useCallback, useState } from 'react';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Content,
  Header,
  Icon, Input,
  Item as ItemContainer,
  NativeBase,
  Right,
} from 'native-base';
import styled from 'styled-components/native';
import moment from 'moment';
import Title from '../../components/atoms/text/Title';
import ToastService from '../../services/ToastService';
import { updatePost } from '../../store/modules/Posts';
import Post from '../../models/Post';
import User from '../../models/User';
import Comment from '../../models/Comment';
import DateFormats from '../../constants/DateFormats';

interface PropsInput extends NativeBase.Input {
  error: boolean,
}

const ContentStyled = styled(Content)`
  margin-right: 20px;
  margin-left: 20px;
`;

const TitleStyled = styled(Title)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputStyled: React.FC<PropsInput> = styled(Input)`
  width: ${(props: PropsInput) => (props.error ? '93%' : '100%')};
  margin-top: 20px;
  padding-bottom: 10px;
`;

const StyledIcon: React.FC<NativeBase.Icon> = styled(Icon)`
  color: #000;
`;

const CommentScreen: NavigationStackScreenComponent = (props: NavigationStackScreenProps) => {
  const { navigation } = props;
  const comment: Comment = navigation.getParam('comment');
  const [editMode] = useState(!!comment);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(comment ? comment.body : '');
  const user: User = useSelector((state: any) => state.auth.user);
  const selectedPost: Post = useSelector((state: any) => state.posts.post);
  const dispatch = useDispatch();

  const onChangeTextHandler = useCallback((text: string) => {
    setValue(text);
    setError(text.length <= 0);
  }, [setValue, setError]);

  const newCommentHandler = useCallback((newComment: Comment) => {
    if (editMode) {
      return;
    }

    selectedPost.comments = [
      ...selectedPost.comments,
      newComment,
    ];

    dispatch(updatePost(selectedPost));
    navigation.goBack();
  }, [dispatch, user, value, selectedPost, editMode]);

  const editCommentHandler = useCallback((newComment: Comment) => {
    if (!editMode) {
      return;
    }

    const filterComments = selectedPost.comments
      .filter((currentComments) => currentComments !== comment);
    selectedPost.comments = [...filterComments, newComment];

    dispatch(updatePost(selectedPost));
    navigation.goBack();
  }, [dispatch, user, value, selectedPost, comment, editMode]);

  const onSubmitHandler = useCallback(() => {
    setError(value.length <= 0);

    if (!error) {
      const newComment: Comment = {
        author: user,
        body: value,
        publishDate: moment().format(DateFormats.database),
      };

      editCommentHandler(newComment);
      newCommentHandler(newComment);
    } else {
      ToastService.closeLabelToast('Error');
    }
  }, [error, value, setError]);

  return (
    <Container>
      <Header transparent>
        <Right>
          <Button transparent>
            <StyledIcon name="md-checkmark" color="#000" onPress={onSubmitHandler} />
          </Button>
        </Right>
      </Header>
      <ContentStyled>
        <TitleStyled>Comment</TitleStyled>
        <ItemContainer error={error}>
          <InputStyled
            placeholder="Type here"
            defaultValue={value}
            onChangeText={onChangeTextHandler}
            error={error}
            scrollEnabled={false}
            multiline
          />
          {error && <Icon name="close-circle" />}
        </ItemContainer>
      </ContentStyled>
    </Container>
  );
};

CommentScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: '#000',
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
});

export default CommentScreen;
