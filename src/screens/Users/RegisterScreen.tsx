import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { View, Text } from 'react-native';

type Params = {};
type ScreenProps = {};

const RegisterScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => (
  <View>
    <Text>Login Screen</Text>
  </View>
);

RegisterScreen.navigationOptions = (navData) => ({
  headerTitle: 'Register',
});

export default RegisterScreen;
