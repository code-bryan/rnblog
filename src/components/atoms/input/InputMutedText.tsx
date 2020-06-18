import React, { useCallback, useState } from 'react';
import {
  Input,
  Item, Label, NativeBase,
} from 'native-base';
import styled from 'styled-components/native';

interface Props extends Partial<NativeBase.Input>{
  id?: string;
  fontSize?: number;
  placeholder?: string;
  onChangeTextarea?: Function;
  defaultValue?: string;
  dismissLabel?: boolean;
  disabled?: boolean;
  onInputChange?: Function;
}

const InputStyled: React.FC<Props> = styled(Input)`
  color: #656565;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
  margin-bottom: 0;
  width: 100%;
`;

const ItemStyled: React.FC<NativeBase.Item> = styled(Item)`
  padding-top: 5px;
  margin-left: 0;
`;

const LabelStyled: React.FC<NativeBase.Label> = styled(Label)`
  margin-left: 6px;
  margin-bottom: 10px;
  font-size: 17px;
`;

const InputMutedText: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, onChangeTextarea, onInputChange } = props;
  const [isValid, setIsValid] = useState(true);

  const onTextAreaChangeHandler = useCallback((text: string) => {
    if (onChangeTextarea) {
      onChangeTextarea(text);
    }

    if (onInputChange) {
      onInputChange(id, text, isValid);
    }
  }, [onChangeTextarea, onInputChange, isValid, setIsValid]);

  return (
    <ItemStyled stackedLabel>
      <LabelStyled>{`${props.placeholder}:`}</LabelStyled>
      <InputStyled
        multiline
        scrollEnabled={false}
        defaultValue={props.defaultValue}
        value={props.defaultValue}
        fontSize={props.fontSize}
        onChangeText={onTextAreaChangeHandler}
        disabled={props.disabled}
      />
    </ItemStyled>
  );
};

export default InputMutedText;
