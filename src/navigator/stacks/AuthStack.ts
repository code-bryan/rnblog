import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../screens/authentication/LoginScreen';
import ForgotPasswordScreen from '../../screens/authentication/ForgotPasswordScreen';
import RegisterScreen from '../../screens/authentication/RegisterScreen';
import CompleteRegistrationScreen from '../../screens/authentication/CompleteRegistrationScreen';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen,
  CompleteRegistration: CompleteRegistrationScreen,
}, {
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default AuthStack;
