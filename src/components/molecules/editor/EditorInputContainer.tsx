import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Icon, NativeBase, Text, View,
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

const CloseIcon: React.FC<NativeBase.Icon> = styled(Icon)`
  margin-right: 10px;
  margin-bottom: 0;
  align-self: flex-end;
`;

const EditorInputContainer: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { body, onEditorChange } = props;
  const [content, setContent] = useState([]);
  const [run, setRun] = useState(true);

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

  const onDeleteContent = useCallback((index: number) => {
    setContent((currentContent) => {
      const newBody: string[] = [];

      if (currentContent.length > 1) {
        const newContent = currentContent.filter((item: any, i:number) => index !== i);
        newContent.map((item: Content) => newBody.push(`${item.type}||${item.value}`));
        onEditorChange(newBody);
        return newContent;
      }

      onEditorChange(newBody);
      return [];
    });
  }, [setContent, content]);

  useEffect(() => {
    if (run && body.length > 0) {
      body.map((item) => {
        const [type, value] = item.split('||');
        const editContent = new Content();
        editContent.type = type;
        editContent.value = value;
        setContent((currentCat) => [...currentCat, editContent]);
      });

      setRun(false);
    }
  }, [body, run, setRun]);

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
              <Container key={index}>
                <CloseIcon name="close" fontSize={23} onPress={onDeleteContent.bind(this, index)} />
                <InputTitle
                  placeholder="Title"
                  defaultValue={item.value}
                  onChangeTextarea={onChangTextareaHandler.bind(this, index)}
                />
              </Container>
            );
          }

          return (
            <Container key={index}>
              <CloseIcon name="close" fontSize={23} onPress={onDeleteContent.bind(this, index)} />
              <InputMutedText
                style={{ marginTop: 0 }}
                placeholder="Content"
                defaultValue={item.value}
                onChangeTextarea={onChangTextareaHandler.bind(this, index)}
              />
            </Container>
          );
        })}
      </TextContainer>
    </Container>
  );
};

export default EditorInputContainer;
