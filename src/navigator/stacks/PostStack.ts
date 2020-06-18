import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import FeedsScreen from '../../screens/posts/FeedsScreen';
import PostScreen from '../../screens/posts/PostScreen';
import ProfileInfoScreen from '../../screens/profile/ProfileInfoScreen';
import CommentScreen from '../../screens/comment/CommentScreen';

const PostStack = createStackNavigator({
  Feeds: FeedsScreen,
  PostDetails: PostScreen,
  ProfileInfo: ProfileInfoScreen,
  Comment: CommentScreen,
}, {
  initialRouteName: 'Feeds',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default PostStack;
