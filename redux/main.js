import {createStore,combineReducers} from 'redux';
import transactionReducer from './reducers/transactionReducer';


const reducer = combineReducers({
  transaction: transactionReducer
});


const store = createStore(reducer);

export default store;
