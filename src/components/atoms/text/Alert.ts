import React from 'react';
import styled from 'styled-components/native';
import { NativeBase } from 'native-base';

interface Props extends NativeBase.Text{
  fontSize?: number,
}

const Alert: React.FC<Props> = styled.Text`
  color: #ee5253;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '14px')};
`;

export default Alert;
