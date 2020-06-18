import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';

import app from './modules/App';
import auth from './modules/Authentication';
import posts from './modules/Posts';
import drafts from './modules/Drafts';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  app: app.Reducer,
  auth: auth.Reducer,
  posts: posts.Reducer,
  drafts: drafts.Reducer,
});

const rootPersistReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(rootPersistReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {
  store,
  persistor,
};
