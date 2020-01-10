import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import App from './src/App';
import { name as appName } from './app.json';

const config = {
  apiKey: 'AIzaSyAcm-tbt5JoVNjDfySbqtagAj6jM9LfIXk',
  authDomain: 'rnblog-1c3e2.firebaseapp.com',
  databaseURL: 'https://rnblog-1c3e2.firebaseio.com',
  projectId: 'rnblog-1c3e2',
  storageBucket: 'rnblog-1c3e2.appspot.com',
  messagingSenderId: '204485854129',
  appId: '1:204485854129:web:127f29b865fb66506fb390',
  measurementId: 'G-RH4NDSK1CQ',
};

firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
