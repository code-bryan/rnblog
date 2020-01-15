import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, NativeBase, Text, View,
} from 'native-base';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import InputMutedText from '../../atoms/input/InputMutedText';
import InputTitle from '../../atoms/input/InputTitle';

interface Props {
  body: string[];
  onEditorChange: Function;
}

class Content {
  type: 'title' | 'text' = 'text';

  value: string = '';
}

const Container: React.FC<NativeBase.View> = styled(View)`
  margin-top: 20px;
`;

const InputsContainer: React.FC<NativeBase.View> = styled(View)`
  flex-direction: row;
`;

const TextContainer: React.FC<NativeBase.View> = styled(View)`
  margin-top: 10px;
`;

const InputButton: React.FC<NativeBase.Button> = styled(Button)`
  margin-right: 10px;
`;

const EditorInputContainer: React.FC<Props> = (props) => {
  const { body, onEditorChange } = props;
  const [content, setContent] = useState([]);

  const onSetTitle = useCallback(() => {
    const newContent = new Content();
    newContent.type = 'title';
    setContent((currentContent) => [...currentContent, newContent]);
  }, [setContent, content]);

  const onSetContent = useCallback(() => {
    const newContent = new Content();
    newContent.type = 'text';
    setContent((currentContent) => [...currentContent, newContent]);
  }, [setContent, content]);

  const onChangTextareaHandler = useCallback((index: number, text: string) => {
    const newBody: string[] = [];

    content[index].value = text;
    setContent(content);

    content.map((item: Content) => newBody.push(`${item.type}||${item.value}`));

    onEditorChange(newBody);
  }, [content, setContent, onEditorChange]);

  useEffect(() => {}, [body]);

  return (
    <Container>
      <InputsContainer>
        <ScrollView horizontal>
          <InputButton bordered full onPress={onSetTitle}>
            <Text>Title</Text>
          </InputButton>

          <InputButton bordered full onPress={onSetContent}>
            <Text>Text</Text>
          </InputButton>
        </ScrollView>
      </InputsContainer>

      <TextContainer>
        {content.length > 0 && content.map((item: Content, index: number) => {
          if (item.type === 'title') {
            return (
              <InputTitle key={index} placeholder="Title" onChangeTextarea={onChangTextareaHandler.bind(this, index)} />
            );
          }

          return <InputMutedText key={index} placeholder="Content" onChangeTextarea={onChangTextareaHandler.bind(this, index)} />;
        })}
      </TextContainer>
    </Container>
  );
};

export default EditorInputContainer;
