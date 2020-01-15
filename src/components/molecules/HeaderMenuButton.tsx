import CustomHeaderButton from "../atoms/button/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import React from "react";

interface Props {
  navigation: any,
}

const HeaderMenuButton: React.FC<Props> = (props) => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item
      title="Menu"
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      buttonStyle={{ marginLeft: 20 }}
      onPress={() => {
        props.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

export default HeaderMenuButton;
