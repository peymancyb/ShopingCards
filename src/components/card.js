import React,{Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import styles from './style';

export default class CardComponent extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            style={styles.cardPic}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{color:'white'}}>{this.props.name}</Text>
          <View style={styles.price}>
            <Text style={{color:'white'}}>{this.props.date}</Text>
            <Text style={{marginLeft:20,color:'white'}}>{this.props.price}</Text>
          </View>
        </View>
      </View>
    );
  }
}
