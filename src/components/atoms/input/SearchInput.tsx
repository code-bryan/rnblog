import React from 'react';
import { Input, Item, NativeBase } from 'native-base';
import styled from 'styled-components/native';

interface Props {
  label: string;
  onInputChange: Function;
}

const InputContent: React.FC<NativeBase.Item> = styled(Item)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0;
  padding: 0;
`;

const InputStyled: React.FC<NativeBase.Input> = styled(Input)`
  font-weight: bold;
  font-size: 24px;
`;


const SearchInput: React.FC<Props> = (props) => (
  <InputContent>
    <InputStyled
      placeholder={props.label}
      onChangeText={props.onInputChange}
      autoCapitalize="none"
    />
  </InputContent>
);

export default SearchInput;
