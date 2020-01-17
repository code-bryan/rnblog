import React from 'react';
import { TouchableOpacity } from 'react-native';
import MenuIcon from '../atoms/Menu/MenuIcon';
import MenuText from '../atoms/Menu/MenuText';
import MenuContent from '../atoms/Menu/MenuContent';

interface Props {
  menuIconName: string;
  onPress: Function;
  active?: boolean;
}

const MenuItem: React.FC<Props> = (props) => (
  <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
    <MenuContent active={props.active}>
      <MenuIcon name={props.menuIconName} active={props.active} />
      <MenuText active={props.active}>{props.children}</MenuText>
    </MenuContent>
  </TouchableOpacity>
);

export default MenuItem;
