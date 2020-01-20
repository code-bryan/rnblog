import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Input, Item, Label, NativeBase, Textarea, View } from 'native-base';
import Colors from '../../../constants/Colors';

interface Props extends Partial<NativeBase.Input>{
  fontSize?: number;
  color?: 'default' | 'primary';
  bold?: 'bold' | 'normal';
  placeholder?: string;
  onChangeTextarea?: Function;
  defaultValue?: string;
}

const ItemStyled: React.FC<NativeBase.Item> = styled(Item)`
  padding-top: 15px;
  margin-left: 0;
`;

const InputStyled: React.FC<Props> = styled(Input)`
  color: ${(props: Props) => (props.color === 'default' ? Colors.primary : 'black')};
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '18px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : 'bold')};
  width: 100%;
`;

const LabelStyled: React.FC<NativeBase.Label> = styled(Label)`
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 18px;
`;

const InputTitle: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onChangeTextarea } = props;
  const [value, setValue] = useState(props.defaultValue || '');

  const onTextAreaChangeHandler = useCallback((text: string) => {
    setValue(text);

    if (onChangeTextarea) {
      onChangeTextarea(text);
    }
  }, [setValue, onChangeTextarea]);

  return (
    <ItemStyled stackedLabel>
      <LabelStyled>{props.placeholder}</LabelStyled>
      <InputStyled
        value={value}
        fontSize={props.fontSize}
        color={props.color}
        bold={props.bold}
        onChangeText={onTextAreaChangeHandler}
        multiline
        scrollEnabled={false}
      />
    </ItemStyled>
  );
};

export default InputTitle;
