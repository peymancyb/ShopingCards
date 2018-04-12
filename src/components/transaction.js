import React,{Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './style';
import {
  Icon,
  Right
} from 'native-base';


export default class ItemComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:this.props.items,
    };
    this.addtransaction = this.addtransaction.bind(this);
    this.removetransaction = this.removetransaction.bind(this);
  }
  addtransaction(){
    let oldArr = this.state.items;
    let firstItem = this.state.items[0];
    oldArr.push(firstItem);
    this.setState({
      items: oldArr
    })
  }
  removetransaction(){

  }
  render(){
    console.log(this.state.items);
    let transactions = this.state.items.map((currentItem,currentIndex)=>{
      return(
          <View style={styles.details} key={`currentItem${currentIndex}`}>
            <Text style={{color:'white',flex:3}}>{currentItem.name}</Text>
            <View style={styles.price}>
              <Text style={{color:'white'}}>{currentItem.date}</Text>
              <Text style={{marginLeft:20,color:'white'}}>{currentItem.currency}{this.props.price}</Text>
            </View>
          </View>
      );
    });

    return(
      <View>
        {transactions}
        <View style={{flexDirection:"row",flex:1}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',marginLeft:10,marginTop:5,marginBottom:5}}>
              <TouchableOpacity
                onPress={()=>this.removetransaction()}
                style={{justifyContent:'center',alignItems:'center',backgroundColor:'#DD5144',borderRadius:15,width:30,height:30}}>
                <Icon style={{fontSize:30,color:'black'}} name="remove"/>
              </TouchableOpacity>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:10,marginTop:5,marginBottom:5}}>
              <TouchableOpacity
                onPress={()=>this.addtransaction()}
                style={{justifyContent:'center',alignItems:'center',backgroundColor:'#34A34F',borderRadius:15,width:30,height:30}}>
                <Icon style={{fontSize:30,color:'white'}} name="add"/>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}





//
// <View style={styles.details}>
//   <Text style={{color:'white',flex:3}}>{this.props.name}</Text>
//   <View style={styles.price}>
//     <Text style={{color:'white'}}>{this.props.date}</Text>
//     <Text style={{marginLeft:20,color:'white'}}>{this.props.currency}{this.props.price}</Text>
//   </View>
// </View>
// <View style={{flexDirection:"row",flex:1}}>
//   <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',marginLeft:10,marginTop:5,marginBottom:5}}>
//       <TouchableOpacity
//         onPress={()=>this.removetransaction()}
//         style={{justifyContent:'center',alignItems:'center',backgroundColor:'#DD5144',borderRadius:15,width:30,height:30}}>
//         <Icon style={{fontSize:30,color:'black'}} name="remove"/>
//       </TouchableOpacity>
//   </View>
//   <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:10,marginTop:5,marginBottom:5}}>
//       <TouchableOpacity
//         onPress={()=>this.addtransaction()}
//         style={{justifyContent:'center',alignItems:'center',backgroundColor:'#34A34F',borderRadius:15,width:30,height:30}}>
//         <Icon style={{fontSize:30,color:'white'}} name="add"/>
//       </TouchableOpacity>
//   </View>
// </View>
