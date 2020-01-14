import React from 'react';
import { Container, Content, Header } from 'native-base';
import { NavigationScreenComponent } from 'react-navigation';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Post from '../../models/Post';
import Title from '../../components/atoms/text/Title';
import PostActions from '../../components/molecules/PostActions';
import ItemImage from '../../components/atoms/images/ItemImage';
import TextContainer from '../../components/molecules/TextContainer';
import PostUserInfo from '../../components/molecules/PostUserInfo';

type Params = {};
type ScreenProps = {};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
});

const PostScreen: NavigationScreenComponent<Params, ScreenProps> = (props) => {
  const post: Post = useSelector((state: any) => state.posts.post);

  return (
    <Container>
      <Header transparent />
      <Content style={styles.content}>
        <Title>{post.title}</Title>
        <PostUserInfo author={post.author} />
        <PostActions />
        <ItemImage source={{ uri: post.image }} height={200} />
        <TextContainer body={post.body} />
      </Content>
    </Container>
  );
};

PostScreen.navigationOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    marginLeft: 20,
  },
};

export default PostScreen;
