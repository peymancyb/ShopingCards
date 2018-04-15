import {createStore,combineReducers} from 'redux';
import transactionReducer from './reducers/transactionReducer';


const reducer = combineReducers({
  transaction: transactionReducer
});


const store = createStore(reducer);

export default store;



// object sample here
// let obj = {
//   id: rand,
//   title: this.state.category,
//   icon: this.state.img,
//   items:[
//     {
//       name: this.state.name,
//       date: this.state.date,
//       price: this.state.price,
//       currency: this.state.currency,
//     }
//   ]
// };
