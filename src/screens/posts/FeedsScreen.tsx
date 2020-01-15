import React, { useCallback, useEffect } from 'react';
import {
  Container, Content, Header, Icon,
} from 'native-base';
import {
  Platform, RefreshControl, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { getAllPosts, postDetails, setRefreshing } from '../../store/modules/Posts';
import Title from '../../components/atoms/text/Title';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import Post from '../../models/Post';
import CategoryList from '../../components/organisms/CategoriesList';
import PostList from '../../components/organisms/PostList';
import HeaderMenuButton from "../../components/molecules/HeaderMenuButton";
import SearchHeader from "../../components/molecules/SearchHeader";
import NoContentListMessage from "../../components/atoms/NoContentListMessage";

type Params = {};
type ScreenProps = {};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const FeedsScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const categories = useSelector((state: any) => state.posts.categories);
  const posts: Post[] = useSelector((state: any) => state.posts.posts);
  const refreshing = useSelector((state: any) => state.posts.refreshing);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(getAllPosts());
  }, [dispatch]);

  const onSelectedPostHandler = useCallback((selectedPost: Post) => {
    dispatch(postDetails(selectedPost));
    navigation.navigate('PostDetails');
  }, [navigation, dispatch, posts]);

  const onSelectedCategoryHandler = useCallback((categoryId: number) => {
    dispatch(setRefreshing(true));
    dispatch(getAllPosts(categoryId));
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <Container>
      <Header transparent />
      <Content
        refreshing={refreshing}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SearchHeader>Discover News</SearchHeader>

        <CategoryList categories={categories} onCategorySelected={onSelectedCategoryHandler} />

        {posts.length <= 0 && (
          <NoContentListMessage>There are not post available</NoContentListMessage>
        )}

        <PostList posts={posts} onSelectedPost={onSelectedPostHandler} />
      </Content>
    </Container>
  );
};

FeedsScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerLeft: () => (
    <HeaderMenuButton navigation={navData.navigation} />
  ),
});

export default FeedsScreen;
