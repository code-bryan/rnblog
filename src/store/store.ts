import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

import app from './modules/App';
import user from './modules/User';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  app: app.Reducer,
  user: user.Reducer,
});

const rootPersistReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(rootPersistReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {
  store,
  persistor,
};
