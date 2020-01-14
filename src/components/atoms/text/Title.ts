import styled from 'styled-components/native';
import React from 'react';
import { NativeBase } from 'native-base';
import Colors from '../../../constants/Colors';

interface Props extends NativeBase.Text {
  fontSize?: number;
  bold?: 'bold' | 'normal';
  color?: 'default' | 'black';
}

const Title: React.FC<Props> = styled.Text`
  color: ${(props: Props) => (props.color === 'default' ? Colors.primary : 'black')};
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '24px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : 'bold')};
`;

export default Title;
