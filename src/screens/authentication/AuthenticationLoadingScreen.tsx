import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import User from '../../models/User';

type Params = {};
type ScreenProps = {};

// eslint-disable-next-line max-len
const AuthenticationLoadingScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const userAuthenticated: User = useSelector((state: any) => state.auth.user);

  const verifyAppState = useCallback(() => {
    navigation.navigate(userAuthenticated.apiKey.length > 0 ? 'App' : 'Auth');
  }, [navigation, userAuthenticated]);

  useEffect(() => {
    verifyAppState();
  }, [verifyAppState]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthenticationLoadingScreen;
