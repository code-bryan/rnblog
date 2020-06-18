import styled from 'styled-components/native';
import React, { useCallback } from 'react';
import { NativeBase } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Post from '../../models/Post';
import Title from '../atoms/text/Title';
import ItemImage from '../atoms/images/ItemImage';

interface Props {
  post: Post;
  onPress: Function;
}

const PostItemContainer: React.FC<NativeBase.View> = styled.View`
  width: 91%;
  margin: 0 20px;
  padding-bottom: 20px;
  background-color: #fff;
`;

const PostItemHorizontalImageContainer: React.FC<NativeBase.View> = styled.View`
  box-shadow: 0 3px 2px #ccc;
  height: 180px;
  background-color: #fff;
`;

const PostItemHorizontalCategoryTitle: React.FC<NativeBase.Text> = styled.Text`
  margin: 12px 0 5px 0;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
`;


const PostItem: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { post, onPress } = props;

  const onPostPressHandler = useCallback(() => {
    onPress(post.id);
  }, [post, onPress]);

  return (
    <PostItemContainer>
      <TouchableOpacity activeOpacity={0.6} onPress={onPostPressHandler}>
        <PostItemHorizontalImageContainer>
          <ItemImage source={{ uri: post.image }} />
        </PostItemHorizontalImageContainer>
        {post.category && (
          <PostItemHorizontalCategoryTitle>{post.category.value}</PostItemHorizontalCategoryTitle>
        )}
        <Title fontSize={20}>{post.title}</Title>
      </TouchableOpacity>
    </PostItemContainer>
  );
};

export default PostItem;
