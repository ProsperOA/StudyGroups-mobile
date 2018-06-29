import {
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

const compostEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default compostEnhancers(applyMiddleware(thunk));
