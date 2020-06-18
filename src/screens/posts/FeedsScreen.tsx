import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, View } from 'native-base';
import { RefreshControl } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationEvents } from 'react-navigation';
import { getAllPosts, postDetails, setRefreshing } from '../../store/modules/Posts';
import Post from '../../models/Post';
import CategoryList from '../../components/organisms/CategoriesList';
import PostList from '../../components/organisms/PostList';
import HeaderMenuButton from '../../components/molecules/header/HeaderMenuButton';
import SearchHeader from '../../components/organisms/SearchHeader';
import NoContentListMessage from '../../components/atoms/NoContentListMessage';

type Params = {};
type ScreenProps = {};

const FeedsScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const categories = useSelector((state: any) => state.posts.categories);
  const posts: Post[] = useSelector((state: any) => state.posts.posts);
  const refreshing: boolean = useSelector((state: any) => state.posts.refreshing);
  const [visiblePost, setVisiblePost] = useState(posts);
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

  const onSearchHandler = useCallback((filteredPost: Post[]) => {
    setVisiblePost(filteredPost);
  }, [setVisiblePost]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <Container>
      <Header transparent />
      <NavigationEvents onDidFocus={onRefresh} />
      <View style={{ flex: 1 }}>
        <SearchHeader items={posts} onSearch={onSearchHandler}>Discover News</SearchHeader>

        <View>
          <CategoryList categories={categories} onCategorySelected={onSelectedCategoryHandler} />
        </View>

        {posts.length <= 0 && (
          <NoContentListMessage>There are not post available</NoContentListMessage>
        )}

        <PostList
          posts={visiblePost}
          onSelectedPost={onSelectedPostHandler}
          refreshing={refreshing}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
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
