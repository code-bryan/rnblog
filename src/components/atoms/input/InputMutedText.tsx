import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { NativeBase, Textarea, View } from 'native-base';

interface Props extends Partial<NativeBase.Textarea>{
  fontSize?: number;
  placeholder?: string;
  onChangeTextarea?: Function;
  defaultValue?: string,
}

const InputTextarea: React.FC<Props> = styled(Textarea)`
  color: #656565;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
  margin-bottom: 20px;
`;

const InputMutedText: React.FC<Props> = (props) => {
  const { onChangeTextarea } = props;
  const [value, setValue] = useState('');
  const [row, setRow] = useState();

  const onTextAreaChangeHandler = useCallback((text: string) => {
    setValue(text);

    if (onChangeTextarea) {
      onChangeTextarea(text);
    }
  }, [setValue, onChangeTextarea]);

  const onScrollHandler = useCallback(() => {
    setRow((currentRow) => currentRow + 1);
  }, [setRow]);

  return (
    <View>
      <InputTextarea
        rowSpan={row}
        bordered
        underline
        value={value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        fontSize={props.fontSize}
        onChangeText={onTextAreaChangeHandler}
        onScroll={onScrollHandler}
      />
    </View>
  );
};

export default InputMutedText;
