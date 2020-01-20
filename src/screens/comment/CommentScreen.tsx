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
  Text,
} from 'native-base';
import styled from 'styled-components/native';
import moment from 'moment';
import MentionInput from 'react-native-mention';
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

const unique = (array: any[]) => [...new Set(array.map((s) => JSON.stringify(s)))].map((s) => JSON.parse(s));

const CommentScreen: NavigationStackScreenComponent = (props: NavigationStackScreenProps) => {
  const { navigation } = props;
  const comment: Comment = navigation.getParam('comment');
  const [editMode] = useState(!!comment);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(comment ? comment.body : '');
  const user: User = useSelector((state: any) => state.auth.user);
  const selectedPost: Post = useSelector((state: any) => state.posts.post);
  const dispatch = useDispatch();

  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [allUniqueSuggestions, setAllUniqueSuggestions] = useState([]);

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

  const onMentionChangeText = useCallback((text: string) => {
    const data = users;
    const suggestions = data.filter((user) => user.name.toLocaleUpperCase().includes(text.toLocaleUpperCase()));

    const trasformedSuggestion = suggestions.map((item) => ({
      ...item,
      name: item.name.replace(/\s/g, ''),
    }));

    const allSugestions = [...mentionSuggestions, trasformedSuggestion];
    const allUniqueSuggestionMaded = unique(allSugestions);
    setMentionSuggestions(trasformedSuggestion);
    setAllUniqueSuggestions(allUniqueSuggestionMaded);
  }, [mentionSuggestions, setMentionSuggestions, allUniqueSuggestions, setAllUniqueSuggestions]);

  const users = [
    {
      id: 1, name: 'Raza Dar', display: 'mrazadar', gender: 'male',
    },
    {
      id: 3, name: 'Atif Rashid', display: 'atif.rashid', gender: 'male',
    },
    {
      id: 4, name: 'Peter Pan', display: 'peter.pan', gender: 'male',
    },
    {
      id: 5, name: 'John Doe', display: 'john.doe', gender: 'male',
    },
    {
      id: 6, name: 'Meesha Shafi', display: 'meesha.shafi', gender: 'female',
    },
  ];

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

          <MentionInput
            reference={(comp) => {}}
            placeholder="Post something of worth"
            mentionData={mentionSuggestions}
            onChangeText={() => {}}
            mentioningChangeText={onMentionChangeText}
            renderMentionCell={({ item }) => {
              console.log(item);
              return <Text>{item.name}</Text>;
            }}
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
