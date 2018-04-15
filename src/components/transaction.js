import React,{Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './style';
import {
  Icon,
  Right,
  Picker,
  Form,
} from 'native-base';

import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
 } from 'react-native-popup-dialog';
 import store from '../../redux/main'
 import {updateTransaction} from '../../redux/actions/transactionAction';
 import {Provider,connect} from 'react-redux';

 export default class ItemComponent extends Component{
   constructor(props){
     super(props)
   }
   render(){
     return(
       <View>
         <View style={styles.details}>
           <Text style={{color:'white',flex:3}}>{this.props.name}</Text>
           <View style={styles.price}>
             <Text style={{color:'white'}}>{this.props.date}</Text>
             <Text style={{marginLeft:20,color:'white'}}>{this.props.currency}{this.props.price}</Text>
           </View>
         </View>
       </View>
     );
   }
 }
