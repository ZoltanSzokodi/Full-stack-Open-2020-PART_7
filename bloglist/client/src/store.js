import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogs from './reducers/blogs';
import user from './reducers/user';
import notification from './reducers/notification';

const rootReducer = combineReducers({ blogs, user, notification });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
