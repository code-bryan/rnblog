import styled from 'styled-components/native';
import { NativeBase } from 'native-base';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Post from '../../models/Post';

interface Props {
  post: Post;
  onPress: Function;
  onLongPress?: Function;
}

const PostViewVerticalContainer: React.FC<NativeBase.View> = styled.View`
  flex-direction: row;
  margin: 0 20px;
  justify-content: space-between;
  align-items: center;
`;
const PostItemVerticalImage: React.FC<NativeBase.Image> = styled.Image`
  width:  100px;
  height: 100px;
  border-radius: 5px;
`;
const PostItemVerticalTextContainer: React.FC<NativeBase.View> = styled.View`
  width: 70%;
`;
const PostItemVerticalTitle: React.FC<NativeBase.Text> = styled.Text`
  font-size: 18px;
  font-weight: 200;
`;
const PostItemVerticalAuthor: React.FC<NativeBase.Text> = styled.Text`
  font-weight: bold;
  margin-top: 15px;
`;

const Touchable = styled(TouchableOpacity)`
  margin-bottom: 20px;
`;

const DraftItems: React.FC<Props> = (props) => {
  const { post, onPress, onLongPress } = props;

  const onPressHandler = useCallback(() => {
    onPress(post.id);
  }, [post, onPress]);

  const onLongPressHandler = useCallback(() => {
    if (onLongPress) {
      onLongPress(post.id);
    }
  }, [post, onLongPress]);

  return (
    <Touchable activeOpacity={0.6} onPress={onPressHandler} onLongPress={onLongPressHandler}>
      <PostViewVerticalContainer>
        <PostItemVerticalTextContainer>
          <PostItemVerticalTitle>{post.title}</PostItemVerticalTitle>
          {post.author && (
            <PostItemVerticalAuthor>
              {post.author.name}
              {' '}
              {post.author.lastname}
            </PostItemVerticalAuthor>
          )}
        </PostItemVerticalTextContainer>
        <PostItemVerticalImage source={{ uri: post.image }} />
      </PostViewVerticalContainer>
    </Touchable>
  );
};

export default DraftItems;
