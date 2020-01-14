import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import PostItemHorizontal from '../molecules/PostItemHorizontal';
import Post from '../../models/Post';

interface Props {
  posts: Post[];
  onSelectedPost: Function;
}

const PostList: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { posts, onSelectedPost } = props;

  const onSelectedPostHandler = useCallback((id: string) => {
    // eslint-disable-next-line react/prop-types
    const selectedPost: Post = posts.find((post) => post.id === id) as Post;
    onSelectedPost(selectedPost);
  }, [posts, onSelectedPost]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.id}
      renderItem={(itemData) => (
        <PostItemHorizontal post={itemData.item} onPress={onSelectedPostHandler} />
      )}
    />
  );
};

export default PostList;
