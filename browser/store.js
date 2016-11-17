import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducer from './redux';


const middleware = applyMiddleware(thunkMiddleware, createLogger());

const enhancer = compose(middleware, persistState());

export default createStore(reducer, enhancer);