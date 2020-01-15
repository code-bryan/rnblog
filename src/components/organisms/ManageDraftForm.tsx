import React, { useCallback } from 'react';
import {
  Form, Input, NativeBase, View,
} from 'native-base';
import styled from 'styled-components/native';
import EditorInputContainer from '../molecules/editor/EditorInputContainer';
import Post from '../../models/Post';

interface Props {
  newPost: Post;
  onChange: Function;
}

const InputTitle: React.FC<NativeBase.Input> = styled(Input)`
  font-size: 24px;
  font-weight: bold;
`;

const ManageDraftForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { newPost, onChange } = props;

  const onEditorChange = useCallback((newBody: string[]) => {
    // eslint-disable-next-line react/prop-types
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
        <Input
          placeholder="Image link"
          defaultValue={newPost.image}
          onChangeText={onChangeTextHandler.bind(this, 'image')}
        />
      </View>

      <View>
        {/* eslint-disable-next-line react/prop-types */}
        <EditorInputContainer body={newPost.body} onEditorChange={onEditorChange} />
      </View>
    </Form>
  );
};

export default ManageDraftForm;
