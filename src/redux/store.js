import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import for `redux-thunk`
import rootReducer from './reducers/rootReducer';

// Create the Redux store with thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
