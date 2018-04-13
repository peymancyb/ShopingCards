import React,{Component} from 'react';
import {
  Text,
  View,
  } from 'react-native';
import {Provider,connect} from 'react-redux';
import store from './redux/main'
import TransactionComponent from './Transaction';

console.disableYellowBox = true;

export default class App extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <Provider store={store}>
        <TransactionComponent />
      </Provider>
    );
  }
};

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
