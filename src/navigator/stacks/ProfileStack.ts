import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import ProfileScreen from '../../screens/profile/ProfileScreen';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
}, {
  initialRouteName: 'Profile',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default ProfileStack;
