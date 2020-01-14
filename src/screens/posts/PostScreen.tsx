import React from 'react';
import {
  Container, Content, Header, Text,
} from 'native-base';
import { NavigationScreenComponent } from 'react-navigation';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Post from '../../models/Post';
import Title from '../../components/atoms/text/Title';

type Params = {};
type ScreenProps = {};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
  },
});

const PostScreen: NavigationScreenComponent<Params, ScreenProps> = (props) => {
  const post: Post = useSelector((state: any) => state.posts.post);

  return (
    <Container>
      <Header transparent />
      <Content style={styles.content}>
        <Title>{post.title}</Title>
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
