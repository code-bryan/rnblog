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

type Params = {};
type ScreenProps = {};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    dispatch(getAllPosts());
    dispatch(setRefreshing(true));
  }, [dispatch]);

  const onSelectedPostHandler = useCallback((selectedPost: Post) => {
    dispatch(postDetails(selectedPost));
    navigation.navigate('PostDetails');
  }, [navigation, dispatch, posts]);

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
        <View style={styles.headerContainer}>
          <Title>Discover News</Title>
          <TouchableOpacity activeOpacity={0.6}>
            <Icon type="Ionicons" fontSize={20} name={Platform.OS === 'android' ? 'md-search' : 'ios-search'} />
          </TouchableOpacity>
        </View>

        <CategoryList categories={categories} />

        <PostList posts={posts} onSelectedPost={onSelectedPostHandler} />
      </Content>
    </Container>
  );
};

FeedsScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        buttonStyle={{ marginLeft: 20 }}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
});

export default FeedsScreen;
