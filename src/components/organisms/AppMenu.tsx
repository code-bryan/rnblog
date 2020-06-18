import { SafeAreaView, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/modules/Authentication';
import MenuItem from '../molecules/MenuItem';
import UserMenuItem from '../molecules/UserMenuItem';

const AppMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [routeName, setRouteName] = useState(navigation.state.routes[navigation.state.index].routeName);

  const onLogout = useCallback(() => {
    dispatch(logout());
    navigation.navigate('Auth');
  }, [dispatch]);

  useEffect(() => {
    setRouteName(navigation.state.routes[navigation.state.index].routeName);
  }, [navigation, setRouteName]);

  return (
    <SafeAreaView>
      <ScrollView>
        <UserMenuItem onPress={() => { navigation.navigate('Profile'); }} />

        {navigation.state.routes.map((item, index) => (
          (item.params.show && (
            <MenuItem
              key={index}
              menuIconName={item.params.icon}
              active={item.routeName === routeName}
              onPress={() => { navigation.navigate(item.key); }}
            >
              {item.params.title}
            </MenuItem>
          ))
        ))}

        <MenuItem menuIconName="md-log-in" onPress={onLogout}>
          Logout
        </MenuItem>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppMenu;
