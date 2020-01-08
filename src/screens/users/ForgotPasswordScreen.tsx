import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { View, Text } from 'react-native';

type Params = {};
type ScreenProps = {};

const ForgotPasswordScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => (
  <View>
    <Text>Login Screen</Text>
  </View>
);

ForgotPasswordScreen.navigationOptions = (navData) => ({
  headerTitle: 'Forgot Password',
});

export default ForgotPasswordScreen;
