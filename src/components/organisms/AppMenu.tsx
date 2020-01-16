import { SafeAreaView, ScrollView } from 'react-native';
import { Icon, Item, Text } from 'native-base';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/modules/Authentication';

const AppMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
    navigation.navigate('Auth');
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Item onPress={() => { navigation.navigate('Feeds'); }}>
          <Icon name="home" />
          <Text>Feeds</Text>
        </Item>

        <Item onPress={() => { navigation.navigate('Draft'); }}>
          <Icon name="clipboard" />
          <Text>Draft</Text>
        </Item>

        <Item onPress={onLogout}>
          <Icon name="log-out" />
          <Text>Logout</Text>
        </Item>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppMenu;
