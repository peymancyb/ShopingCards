import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardComponent from './src/components/card';
import styles from './src/components/style';

// it is an app that manage ur financial so any thing  u add u will find it in the history
// , so as an expl u add shoppping and how much u paid and wn he will add it
//  , and when the list start to be bigger he will store it in the same categorie
//   each categorie has it contains, with dates and price


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      datas:[
        {
          id:1,
          title: 'shoppping',
          name: 'Zara man',
          date: 'sept 10',
          price: '$100',
        },
        {
          id:2,
          title: 'Transport',
          name: 'Bmw',
          date: 'sept 12',
          price: '$130',
        },
      ]
    };

  }
  render() {
    let cards = this.state.datas.map((currentItem , currentIndex)=>{
      return(
        <CardComponent
          key={`key${currentItem.id}`}
          title = {currentItem.title}
          name = {currentItem.name}
          date = {currentItem.date}
          price = {currentItem.price}
         />
      )
    });
    return (
      <View style={styles.container}>
        {cards}
      </View>
    );
  }
}
