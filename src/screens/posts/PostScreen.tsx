import React, { useCallback } from 'react';
import { Container, Content, Header } from 'native-base';
import { NavigationScreenComponent } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Post from '../../models/Post';
import Title from '../../components/atoms/text/Title';
import PostActions from '../../components/molecules/PostActions';
import ItemImage from '../../components/atoms/images/ItemImage';
import EditorTextContainer from '../../components/molecules/editor/EditorTextContainer';
import PostUserInfo from '../../components/molecules/PostUserInfo';
import User from '../../models/User';
import { addLike } from '../../store/modules/Posts';

type Params = {};
type ScreenProps = {};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
});

const PostScreen: NavigationScreenComponent<Params, ScreenProps> = (props) => {
  const user: User = useSelector((state: any) => state.auth.user);
  const post: Post = useSelector((state: any) => state.posts.post);
  const dispatch = useDispatch();

  const onLikeHandler = useCallback(() => {
    const hasLiked = post.likes.find((userId) => user.uid === userId);

    if (hasLiked) {
      post.likes = post.likes.filter((userId) => userId !== hasLiked);
    } else {
      post.likes.push(user.uid);
    }

    dispatch(addLike(post));
  }, [user, post, dispatch]);

  return (
    <Container>
      <Header transparent />
      <Content style={styles.content}>
        <Title>{post.title}</Title>
        <PostUserInfo author={post.author} publishDate={post.publishDate} />
        <PostActions likes={post.likes} comments={post.comments} onLikePress={onLikeHandler} />
        <ItemImage source={{ uri: post.image }} height={200} />
        <EditorTextContainer body={post.body} />
      </Content>
    </Container>
  );
};

PostScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: '#000',
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
});

export default PostScreen;
