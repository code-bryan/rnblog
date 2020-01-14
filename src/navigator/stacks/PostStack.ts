import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import FeedsScreen from '../../screens/posts/FeedsScreen';
import PostScreen from '../../screens/posts/PostScreen';

const PostStack = createStackNavigator({
  Feeds: FeedsScreen,
  PostDetails: PostScreen,
}, {
  initialRouteName: 'Feeds',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default PostStack;
