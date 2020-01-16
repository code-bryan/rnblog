import React, { useCallback, useEffect, useState } from 'react';
import {
  Form, Icon, Input, Item, NativeBase, Picker, Radio, Text, View,
} from 'native-base';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import EditorInputContainer from '../molecules/editor/EditorInputContainer';
import Post from '../../models/Post';
import Category from '../../models/Category';

interface Props {
  newPost: Post;
  onChange: Function;
}

const InputStyled: React.FC<NativeBase.Input> = styled(Input)`
`;

const InputTitle: React.FC<NativeBase.Input> = styled(InputStyled)`
  font-size: 24px;
  font-weight: bold;
`;

const Touchable = styled(TouchableOpacity)`
  flex-direction: row;
  margin: 10px 5px;
  align-content: flex-start;
  justify-content: space-between;
  padding: 15px 0;
`;

const ManageDraftForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { newPost, onChange } = props;
  const [cat, setCat] = useState([]);
  const categories: Category[] = useSelector((state: any) => state.posts.categories);

  const onEditorChange = useCallback((newBody: string[]) => {
    newPost.body = newBody;
    onChange(newPost);
  }, [newPost, onChange]);

  const onChangeTextHandler = useCallback((type: string, text: string) => {
    if (type === 'title') {
      newPost.title = text;
    } else {
      newPost.image = text;
    }

    onChange(newPost);
  }, [newPost, onChange]);

  const onCategoryChangeHandler = useCallback((value: any) => {
    newPost.category = categories.find((category) => category.id === value) as Category;
    onChange(newPost);
  }, [newPost, onChange, categories]);

  const onCommentsAvailableHandler = useCallback(() => {
    newPost.commentsAvailable = !newPost.commentsAvailable;
    onChange(newPost);
  }, [newPost, onChange]);

  useEffect(() => {
    setCat([]);
    categories.forEach((category) => {
      if (category.id !== 1) {
        setCat((currentCategory) => [...currentCategory, category]);
      }
    });
  }, [categories, setCat]);

  return (
    <Form>
      <View>
        <InputTitle
          placeholder="Title"
          defaultValue={newPost.title}
          onChangeText={onChangeTextHandler.bind(this, 'title')}
        />
      </View>

      <View>
        <InputStyled
          placeholder="Image link"
          defaultValue={newPost.image}
          onChangeText={onChangeTextHandler.bind(this, 'image')}
        />
      </View>

      <Touchable activeOpacity={0.6} onPress={onCommentsAvailableHandler}>
        <Text>Comments Available</Text>
        <Radio
          selected={newPost.commentsAvailable}
          onPress={onCommentsAvailableHandler}
          selectedColor="#000"
          activeOpacity={0.6}
        />
      </Touchable>


      <Picker
        mode="dropdown"
        textStyle={{ paddingLeft: 7, paddingRight: 0 }}
        iosIcon={<Icon name="arrow-down" style={{ marginRight: 3 }} fontSize={32} />}
        placeholder="Select a category"
        selectedValue={newPost.category.id}
        onValueChange={onCategoryChangeHandler}
      >
        {cat.map((category) => (
          <Picker.Item key={category.id} label={category.value} value={category.id} />
        ))}
      </Picker>

      <View>
        {/* eslint-disable-next-line react/prop-types */}
        <EditorInputContainer body={newPost.body} onEditorChange={onEditorChange} />
      </View>
    </Form>
  );
};

export default ManageDraftForm;
