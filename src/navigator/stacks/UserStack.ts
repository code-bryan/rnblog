import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../screens/users/LoginScreen';
import ForgotPasswordScreen from '../../screens/users/ForgotPasswordScreen';
import RegisterScreen from '../../screens/users/RegisterScreen';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';

const UserStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen,
}, {
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default UserStack;
