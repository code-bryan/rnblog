import { createAppContainer } from 'react-navigation';
import UserStack from './stacks/UserStack';

const rootNavigator = createAppContainer(UserStack);

export default rootNavigator;
