import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const DefaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
  headerTitleStyle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
};

export default DefaultStackNavigationOptions;
