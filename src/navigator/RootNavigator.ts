import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AuthStack from './stacks/AuthStack';
import AuthenticationLoadingScreen from '../screens/authentication/AuthenticationLoadingScreen';
import PostStack from './stacks/PostStack';
import DraftStack from './stacks/DraftStack';
import AppMenu from '../components/organisms/AppMenu';

const DrawerStack = createDrawerNavigator({
  Feeds: PostStack,
  Draft: DraftStack,
}, {
  initialRouteName: 'Feeds',
  contentComponent: AppMenu,
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
