import React from 'react';
import { Icon, NativeBase } from 'native-base';
import styled from 'styled-components/native';

interface Props extends NativeBase.Icon {
  active?: boolean;
}

const MenuIcon: React.FC<Props> = styled(Icon)`
  width: 30px;
  font-size: 24px;
  color: ${(props: Props) => (props.active ? '#fff' : '#7b7b7b')};
`;

export default MenuIcon;
