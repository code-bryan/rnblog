import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../screens/Users/LoginScreen';
import ForgotPasswordScreen from '../../screens/Users/ForgotPasswordScreen';
import RegisterScreen from '../../screens/Users/RegisterScreen';

const UserStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen,
});

export default UserStack;
