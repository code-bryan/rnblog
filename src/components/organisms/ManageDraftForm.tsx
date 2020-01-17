import React, { useCallback, useEffect, useState } from 'react';
import {
  Form, Input, NativeBase, Picker, View,
} from 'native-base';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import EditorInputContainer from '../molecules/editor/EditorInputContainer';
import Post from '../../models/Post';
import Category from '../../models/Category';
import FieldPicker from '../molecules/form/FieldPicker';
import FieldRadio from '../molecules/form/FieldRadio';

interface Props {
  newPost: Post;
  onChange: Function;
  editMode: boolean;
}

const InputStyled: React.FC<NativeBase.Input> = styled(Input)`
`;

const InputTitle: React.FC<NativeBase.Input> = styled(InputStyled)`
  font-size: 24px;
  font-weight: bold;
`;

const ManageDraftForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { newPost, onChange, editMode } = props;
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

      <FieldRadio selected={newPost.commentsAvailable} onPress={onCommentsAvailableHandler}>
        Comments Available
      </FieldRadio>

      <FieldPicker
        textStyle={{ paddingLeft: 7, paddingRight: 0 }}
        selectedValue={newPost.category.id}
        placeholder="Select a category"
        onValueChange={onCategoryChangeHandler}
      >
        {cat.map((category) => (
          <Picker.Item key={category.id} label={category.value} value={category.id} />
        ))}
      </FieldPicker>


      <View>
        {/* eslint-disable-next-line react/prop-types */}
        <EditorInputContainer editMode={editMode} body={newPost.body} onEditorChange={onEditorChange} />
      </View>
    </Form>
  );
};

export default ManageDraftForm;
