import React from 'react';
import { TouchableOpacity } from 'react-native';
import MenuIcon from '../atoms/menu/MenuIcon';
import MenuText from '../atoms/menu/MenuText';
import MenuContent from '../atoms/menu/MenuContent';

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
