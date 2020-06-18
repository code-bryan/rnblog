import React from 'react';
import { NativeBase, View } from 'native-base';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';

interface Props extends NativeBase.View {
  active?: boolean;
}

const MenuContent: React.FC<Props> = styled(View)`
  flex-direction: row;
  width: 85%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 40px;
  align-items: center;
  justify-content: flex-start;
  height: 45px;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  background-color: ${(props: Props) => (props.active ? Colors.primary : '#fff')};
`;

export default MenuContent;
