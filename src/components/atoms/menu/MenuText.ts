import React from 'react';
import { NativeBase, Text } from 'native-base';
import styled from 'styled-components/native';

interface Props extends NativeBase.Text {
  active?: boolean;
}

const MenuText: React.FC<Props> = styled(Text)`
  margin-left: 10px;
  font-weight: bold;
  color: ${(props: Props) => (props.active ? '#fff' : '#000')};
`;

export default MenuText;
