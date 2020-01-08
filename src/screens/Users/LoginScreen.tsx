import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { View, Text } from 'react-native';

type Params = {};
type ScreenProps = {};

const LoginScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => (
  <View>
    <Text>Login Screen</Text>
  </View>
);

LoginScreen.navigationOptions = (navData) => ({
  headerTitle: 'Login',
});

export default LoginScreen;
