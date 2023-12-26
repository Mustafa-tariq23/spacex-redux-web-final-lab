import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import missionsReducer from './missionsSlice';
import rocketReducer from './rocketSlice';

const reducer = combineReducers({
  missionsReducer,
  rocketReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;