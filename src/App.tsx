import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from 'native-base';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import RootNavigator from './navigator/RootNavigator';
import { store, persistor } from './store/store';

const App = () => {
  const [notificationListener, setNotificationListener] = useState(null);

  const getToken = useCallback(async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      await firebase.messaging().requestPermission();
      await getToken();
    } catch (e) {
      console.log('permission rejected');
    }
  }, []);

  const checkPermission = useCallback(async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      await getToken();
    } else {
      await requestPermission();
    }
  }, []);

  const registerNotificationListener = useCallback(async () => {
    const listener = firebase.notifications().onNotification((notifications) => {
      console.log(notifications);
      firebase.notifications().displayNotification(notifications);
    });
    setNotificationListener(listener);
  }, [setNotificationListener]);

  const removeNotificationListener = useCallback(() => {
    if (notificationListener) {
      notificationListener();
      setNotificationListener(null);
    }
  }, [notificationListener, setNotificationListener]);

  const initNotification = useCallback(async () => {
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.High,
    ).setDescription('my apps test channel');

    await firebase.notifications().android.createChannel(channel);
    await checkPermission();
    await registerNotificationListener();
  }, []);

  useEffect(() => {
    initNotification();

    return () => {
      removeNotificationListener();
    };
  }, [checkPermission, registerNotificationListener, removeNotificationListener, initNotification]);

  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </Root>
  );
};

export default App;
