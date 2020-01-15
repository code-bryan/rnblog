import { createStackNavigator } from 'react-navigation-stack';
import DefaultStackNavigationOptions from '../DefaultStackNavigationOptions';
import DraftScreen from '../../screens/draft/DraftScreen';
import AddDraftScreen from "../../screens/draft/AddDraftScreen";

const DraftStack = createStackNavigator({
  Draft: DraftScreen,
  AddDraft: AddDraftScreen,
}, {
  initialRouteName: 'Draft',
  defaultNavigationOptions: {
    ...DefaultStackNavigationOptions,
  },
});

export default DraftStack;
