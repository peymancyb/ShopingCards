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
  render(){
    return(
      <Provider store={store}>
        <TransactionComponent />
      </Provider>
    );
  }
};
