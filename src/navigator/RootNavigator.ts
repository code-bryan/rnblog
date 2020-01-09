import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStack from './stacks/AuthStack';
import AuthenticationLoadingScreen from '../screens/authentication/AuthenticationLoadingScreen';
import HomeScreen from '../screens/HomeScreen';

const switchNavigation = createSwitchNavigator({
  AuthLoading: AuthenticationLoadingScreen,
  App: HomeScreen,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});

const rootNavigator = createAppContainer(switchNavigation);

export default rootNavigator;
