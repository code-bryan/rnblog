import React, { useCallback } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import PostItem from '../molecules/PostItem';
import Post from '../../models/Post';

interface Props{
  posts: Post[];
  onSelectedPost: Function;
  refreshing?: boolean;
  refreshControl?: any
}

const PostList: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    posts, onSelectedPost, refreshing, refreshControl,
  } = props;

  const onSelectedPostHandler = useCallback((id: string) => {
    // eslint-disable-next-line react/prop-types
    const selectedPost: Post = posts.find((post) => post.id === id) as Post;
    onSelectedPost(selectedPost);
  }, [posts, onSelectedPost]);

  return (
    <FlatList
      data={posts}
      style={{ flex: 1 }}
      keyExtractor={(item: any) => item.id}
      refreshing={refreshing}
      contentInsetAdjustmentBehavior="automatic"
      nestedScrollEnabled
      renderItem={(itemData) => (
        <PostItem post={itemData.item} onPress={onSelectedPostHandler} />
      )}
    />
  );
};

export default PostList;
