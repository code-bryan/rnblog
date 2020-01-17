import styled from 'styled-components/native';
import { NativeBase } from 'native-base';
import React from 'react';

interface Props extends NativeBase.Text{
  fontSize?: number;
  margin?: boolean;
}

const MutedText: React.FC<Props> = styled.Text`
  color: #656565;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
  margin-bottom: ${(props: Props) => (props.margin ? '0' : '20px')};
`;

export default MutedText;
