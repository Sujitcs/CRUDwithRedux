import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
  auth: authReducer,

});
 
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = createStore(persistedReducer)
  export const persistor = persistStore(store)

