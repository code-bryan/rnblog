import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Item, Label, NativeBase, Textarea, View } from 'native-base';
import Colors from '../../../constants/Colors';

interface Props extends Partial<NativeBase.Textarea>{
  fontSize?: number;
  color?: 'default' | 'primary';
  bold?: 'bold' | 'normal';
  placeholder?: string;
  onChangeTextarea?: Function;
  defaultValue?: string;
}

const ItemStyled: React.FC<NativeBase.Item> = styled(Item)`
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 0;
`;

const InputTextarea: React.FC<Props> = styled(Textarea)`
  color: ${(props: Props) => (props.color === 'default' ? Colors.primary : 'black')};
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '32px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : 'bold')};
  width: 100%;
`;

const LabelStyled: React.FC<NativeBase.Label> = styled(Label)`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InputTitle: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onChangeTextarea } = props;
  const [value, setValue] = useState(props.defaultValue || '');
  const [row, setRow] = useState(1);

  const onTextAreaChangeHandler = useCallback((text: string) => {
    setValue(text);

    if (onChangeTextarea) {
      onChangeTextarea(text);
    }
  }, [setValue, onChangeTextarea]);

  const onScrollHandler = useCallback(() => {
    setRow((currentRow) => currentRow + 1);
  }, [setRow]);

  const onContentSizeChangeHandler = useCallback(() => {
    setRow((currentRow) => currentRow - 1);
  }, [setRow]);

  return (
    <ItemStyled stackedLabel>
      <LabelStyled>{props.placeholder}</LabelStyled>
      <InputTextarea
        rowSpan={row}
        value={value}
        fontSize={props.fontSize}
        color={props.color}
        bold={props.bold}
        onChangeText={onTextAreaChangeHandler}
        onScroll={onScrollHandler}
        onContentSizeChange={onContentSizeChangeHandler}
      />
    </ItemStyled>
  );
};

export default InputTitle;
