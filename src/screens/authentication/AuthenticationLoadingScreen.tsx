import React, { useCallback } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useStore } from "react-redux";
import User from "../../models/User";
import { NavigationStackScreenComponent } from "react-navigation-stack";

type Params = {};
type ScreenProps = {};


const AuthenticationLoadingScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const verifyAppState = useCallback(() => {
    const userAuthenticated = useStore(state => state.auth.user) as User;
    props.navigation.navigate(userAuthenticated.apiKey.length > 0 ? 'App' : 'Auth');
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
