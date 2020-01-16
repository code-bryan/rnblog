import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AuthStack from './stacks/AuthStack';
import AuthenticationLoadingScreen from '../screens/authentication/AuthenticationLoadingScreen';
import PostStack from './stacks/PostStack';
import DraftStack from './stacks/DraftStack';

const DrawerStack = createDrawerNavigator({
  Post: PostStack,
  Draft: DraftStack,
}, {
  initialRouteName: 'Post',
});

const switchNavigation = createSwitchNavigator({
  AuthLoading: AuthenticationLoadingScreen,
  App: DrawerStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});

const rootNavigator = createAppContainer(switchNavigation);

export default rootNavigator;
