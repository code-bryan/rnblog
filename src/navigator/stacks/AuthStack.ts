import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../screens/authentication/LoginScreen';
import ForgotPasswordScreen from '../../screens/authentication/ForgotPasswordScreen';
import RegisterScreen from '../../screens/authentication/RegisterScreen';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen,
}, {
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default AuthStack;
