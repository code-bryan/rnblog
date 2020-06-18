import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import DraftScreen from '../../screens/draft/DraftScreen';
import ManageDraftScreen from "../../screens/draft/ManageDraftScreen";

const DraftStack = createStackNavigator({
  Draft: DraftScreen,
  ManageDraft: ManageDraftScreen,
}, {
  initialRouteName: 'Draft',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default DraftStack;
