import styled from 'styled-components/native';
import { NativeBase } from 'native-base';
import React from 'react';

interface Props extends NativeBase.Text{
  fontSize?: number;
  noMargin?: boolean;
  bold?: boolean;
}

const MutedText: React.FC<Props> = styled.Text`
  color: #656565;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
  margin-bottom: ${(props: Props) => (props.noMargin ? '0' : '20px')};
  font-weight: ${(props: Props) => (props.bold ? 'bold' : 'normal')};
`;

export default MutedText;
