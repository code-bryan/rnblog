import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import User from '../../models/User';

type Params = {};
type ScreenProps = {};

const AuthenticationLoadingScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const userAuthenticated = useSelector((state: any) => state.auth.user) as User;

  const verifyAppState = useCallback(() => {
    console.log(userAuthenticated.apiKey.length > 0);
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
