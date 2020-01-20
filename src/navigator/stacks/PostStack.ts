import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import FeedsScreen from '../../screens/posts/FeedsScreen';
import PostScreen from '../../screens/posts/PostScreen';
import ProfileInfoScreen from '../../screens/profile/ProfileInfoScreen';

const PostStack = createStackNavigator({
  Feeds: FeedsScreen,
  PostDetails: PostScreen,
  ProfileInfo: ProfileInfoScreen,
}, {
  initialRouteName: 'Feeds',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default PostStack;
