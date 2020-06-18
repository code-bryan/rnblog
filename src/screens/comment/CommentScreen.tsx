import React, { useCallback, useEffect, useState } from 'react';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Container, Header, Icon, NativeBase, Right, View,
} from 'native-base';
import styled from 'styled-components/native';
import moment from 'moment';
import MentionsTextInput from 'react-native-mentions';
import { ActivityIndicator, FlatList } from 'react-native';
import Title from '../../components/atoms/text/Title';
import ToastService from '../../services/ToastService';
import { updatePost } from '../../store/modules/Posts';
import Post from '../../models/Post';
import User from '../../models/User';
import Comment from '../../models/Comment';
import DateFormats from '../../constants/DateFormats';
import { getUsers } from '../../store/modules/App';
import UserMention from '../../models/UserMention';
import MentionUserItem from '../../components/molecules/MentionUserItem';
import CommentView from '../../components/molecules/comments/CommentView';

interface ViewProps extends NativeBase.View {
  error: boolean
}

const ContentStyled: React.FC<NativeBase.View> = styled(View)`
  height: 50%;
`;

const TitleStyled = styled(Title)`
  margin: 10px 20px;
`;

const ContentView = styled(View)`
  flex: 1;
  margin-bottom: 10px;
`;

const InputContainer: React.FC<ViewProps> = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
  padding: 10px 20px 0 20px;
  border-color: ${(props: ViewProps) => (props.error ? '#e74c3c' : '#ccc')};
  border-width: 0.6px;
`;

const StyledIcon: React.FC<NativeBase.Icon> = styled(Icon)`
  color: #000;
`;

const IconError: React.FC<NativeBase.Icon> = styled(Icon)`
  color: #e74c3c;
`;

const CommentScreen: NavigationStackScreenComponent = (props: NavigationStackScreenProps) => {
  const { navigation } = props;
  const comment: Comment = navigation.getParam('comment');

  const user: User = useSelector((state: any) => state.auth.user);
  const selectedPost: Post = useSelector((state: any) => state.posts.post);
  const users: UserMention[] = useSelector((state: any) => state.app.users);

  const [editMode] = useState(!!comment);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(comment ? comment.body : '');
  const [comments] = useState(
    comment ? selectedPost.comments.filter((data) => data !== comment) : selectedPost.comments,
  );
  const dispatch = useDispatch();

  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [keyword, setKeyword] = useState('');

  const newCommentHandler = useCallback((newComment: Comment) => {
    if (editMode) {
      return;
    }

    selectedPost.comments = [
      ...selectedPost.comments,
      newComment,
    ];

    dispatch(updatePost(selectedPost));
  }, [dispatch, user, value, selectedPost, editMode]);

  const editCommentHandler = useCallback((newComment: Comment) => {
    if (!editMode) {
      return;
    }

    const filterComments = selectedPost.comments
      .filter((currentComments) => currentComments !== comment);
    selectedPost.comments = [...filterComments, newComment];

    dispatch(updatePost(selectedPost));
  }, [dispatch, user, value, selectedPost, comment, editMode]);

  const onSubmitHandler = useCallback(() => {
    const errorOnSubmit = value.length <= 0;
    setError(errorOnSubmit);

    if (!errorOnSubmit) {
      const newComment: Comment = {
        id: !editMode ? selectedPost.comments.length : comment.id,
        author: user,
        body: value,
        publishDate: moment().format(DateFormats.database),
      };

      editCommentHandler(newComment);
      newCommentHandler(newComment);
      navigation.goBack();
    } else {
      ToastService.closeLabelToast('The comment box is empty, please write a comment');
    }
  }, [value, setError]);

  const onChangeTextHandler = useCallback((text: string) => {
    setValue(text);
    setError(text.length <= 0);
  }, [setValue, setError]);

  const onMentionChangeText = useCallback((text: string) => {
    const suggestion = users.filter(
      (item) => item.name.toLocaleUpperCase().includes(
        text.replace('@', '').toLocaleUpperCase(),
      ),
    );

    // @ts-ignore
    setMentionSuggestions(suggestion);
    setKeyword(text);
  }, [setMentionSuggestions, setKeyword]);

  const onUserTapText = useCallback((username: string) => {
    setValue((currentValue) => {
      const newValue = currentValue.slice(0, -keyword.length);

      return `${newValue} @${username}`;
    });
  }, [setValue, keyword]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
        <FlatList
          data={comments}
          renderItem={(data) => (
            <CommentView
              comment={data.item}
            />
          )}
        />

        <InputContainer error={error}>

          <ContentView>
            <MentionsTextInput
              textInputStyle={{ fontSize: 16 }}
              trigger="@"
              value={value}
              triggerLocation="new-word-only"
              horizontal
              autoFocus
              multiline={false}
              placeholder="Add a comment..."
              textInputMinHeight={30}
              textInputMaxHeight={80}
              MaxVisibleRowCount={3}
              suggestionRowHeight={45}
              keyExtractor={(item: any) => item.id}
              suggestionsData={mentionSuggestions}
              triggerCallback={onMentionChangeText}
              onChangeText={onChangeTextHandler}
              suggestionsPanelStyle={{ backgroundColor: '#fff' }}
              loadingComponent={() => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}
              renderSuggestionsRow={(data: any, hidePanel: Function) => (
                <MentionUserItem
                  user={data.item}
                  onUserTap={(username: string) => {
                    hidePanel();
                    onUserTapText(username);
                  }}
                />
              )}
            />
          </ContentView>

          {error && <IconError name="close-circle" />}
        </InputContainer>
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
