import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from 'native-base';

import RootNavigator from './navigator/RootNavigator';
import { store, persistor } from './store/store';

const App = () => {


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
