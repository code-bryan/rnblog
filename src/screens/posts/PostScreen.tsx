import React, { useCallback, useEffect, useState } from 'react';
import { Container, Content, Header } from 'native-base';
import { NavigationScreenComponent } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';
import Post from '../../models/Post';
import Title from '../../components/atoms/text/Title';
import PostActions from '../../components/molecules/PostActions';
import ItemImage from '../../components/atoms/images/ItemImage';
import EditorTextContainer from '../../components/molecules/editor/EditorTextContainer';
import PostUserInfo from '../../components/molecules/PostUserInfo';
import User from '../../models/User';
import { updatePost } from '../../store/modules/Posts';
import CommentManager from '../../components/organisms/CommentManager';
import Comment from '../../models/Comment';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
});

const PostScreen: NavigationScreenComponent<any, any> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
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

    dispatch(updatePost(post));
  }, [user, post, dispatch]);

  const onUserTap = useCallback(() => {
    const { author } = post;

    navigation.navigate({
      routeName: 'ProfileInfo',
      params: { author },
    });
  }, [post, navigation]);

  const onCommentUserSelected = useCallback((author: User) => {
    navigation.navigate({
      routeName: 'ProfileInfo',
      params: { author },
    });
  }, [navigation]);

  const addCommentHandler = useCallback(() => {
    navigation.navigate('Comment');
  }, [navigation]);

  const onEditCommentHandler = useCallback((comment: Comment) => {
    navigation.navigate({
      routeName: 'Comment',
      params: {
        comment,
      },
    });
  }, []);

  const onCommentDeleteHandler = useCallback((newComments: Comment[]) => {
    Alert.alert('Delete commentary', 'Are you sure to delete this commentary?', [
      {
        text: 'Yes',
        onPress: () => {
          post.comments = newComments;
          dispatch(updatePost(post));
        },
      },
      {
        text: 'No',
      },
    ]);
  }, [post]);

  return (
    <Container>
      <Header transparent />
      <Content style={styles.content}>
        <Title>{post.title}</Title>
        <PostUserInfo
          author={post.author}
          publishDate={post.publishDate}
          onUserTab={onUserTap}
          arrow
        />
        <PostActions likes={post.likes} comments={post.comments} onLikePress={onLikeHandler} />
        <ItemImage source={{ uri: post.image }} height={200} />
        <EditorTextContainer body={post.body} />
        <CommentManager
          comments={post.comments}
          commentAvailable={post.commentsAvailable}
          onCommentUserTap={onCommentUserSelected}
          onAddComment={addCommentHandler}
          onEdit={onEditCommentHandler}
          onDelete={onCommentDeleteHandler}
        />
      </Content>
    </Container>
  );
};

PostScreen.navigationOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: '#000',
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
};

export default PostScreen;
