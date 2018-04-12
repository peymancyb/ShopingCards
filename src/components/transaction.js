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
  Right
} from 'native-base';

import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
 } from 'react-native-popup-dialog';




const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });



export default class ItemComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:this.props.items,
      show:false,
      remove:false,
      name:'',
      currency:'',
      date:'',
      price:'',
    };
    this.addtransaction = this.addtransaction.bind(this);
    this.removetransaction = this.removetransaction.bind(this);
  }
  addtransaction(){

    let oldArr = this.state.items;

    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };

    oldArr.push(obj);
    this.setState({
      show:false,
      items: oldArr,
      name:'',
      currency:'',
      date:'',
      price:'',
    });

  }
  removetransaction(){
    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };
    let oldArr = this.state.items;
    var indexOfItem = null;
    oldArr.map((currentItem,currentIndex)=>{
      if(currentItem.currency === obj.currency && currentItem.date === obj.date &&  currentItem.name === obj.name && currentItem.price === obj.price){
        indexOfItem = currentIndex;
      };
    });
    if (indexOfItem > -1) {
      oldArr.splice((indexOfItem), 1);
    }
    this.setState({
      remove:false,
      items: oldArr,
      name:'',
      currency:'',
      date:'',
      price:'',
    });
  }

  render(){
    let transactions = this.state.items.map((currentItem,currentIndex)=>{
      return(
          <View style={styles.details} key={`currentItem${currentIndex}`}>
            <Text style={{color:'white',flex:3}}>{currentItem.name}</Text>
            <View style={styles.price}>
              <Text style={{color:'white'}}>{currentItem.date}</Text>
              <Text style={{marginLeft:20,color:'white'}}>{currentItem.currency}{currentItem.price}</Text>
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
                onPress={()=>this.setState({remove: !this.state.remove})}
                style={{justifyContent:'center',alignItems:'center',backgroundColor:'#DD5144',borderRadius:15,width:30,height:30}}>
                <Icon style={{fontSize:30,color:'black'}} name="remove"/>
              </TouchableOpacity>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:10,marginTop:5,marginBottom:5}}>
              <TouchableOpacity
                onPress={()=>this.setState({show: !this.state.show})}
                style={{justifyContent:'center',alignItems:'center',backgroundColor:'#34A34F',borderRadius:15,width:30,height:30}}>
                <Icon style={{fontSize:30,color:'white'}} name="add"/>
              </TouchableOpacity>
          </View>
        </View>



        <View
          style={{position: 'absolute',bottom:280}} >
          {this.state.show?
            <PopupDialog
              dialogTitle={<DialogTitle title="Add Transaction" />}
              show={this.state.show}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={scaleAnimation}
            >
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TextInput
                    value={this.state.name}
                    onChangeText={(name)=>this.setState({name:name})}
                    placeholder={'Transaction'}
                    placeholderTextColor={'black'}
                    style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <TextInput
                      value={this.state.date}
                      onChangeText={(date)=>this.setState({date:date})}
                      placeholder={'Date'}
                      placeholderTextColor={'black'}
                      style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <TextInput
                      value={this.state.currency}
                      onChangeText={(currency)=>this.setState({currency:currency})}
                      placeholder={'Currency'}
                      placeholderTextColor={'black'}
                      style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                      <TextInput
                        value={this.state.price}
                        onChangeText={(price)=>this.setState({price:price})}
                        placeholder={'Price'}
                        placeholderTextColor={'black'}
                        style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                      <TouchableOpacity
                        onPress={()=>this.addtransaction()}
                        style={{backgroundColor:'#34A34F',marginTop:20,width:100,height:30,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>Add</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            </PopupDialog>
            :
          ''}

          {this.state.remove?
            <PopupDialog
              dialogTitle={<DialogTitle title="Remove Transaction" />}
              show={this.state.remove}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={scaleAnimation}
            >
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TextInput
                    value={this.state.name}
                    onChangeText={(name)=>this.setState({name:name})}
                    placeholder={'Transaction'}
                    placeholderTextColor={'black'}
                    style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <TextInput
                      value={this.state.date}
                      onChangeText={(date)=>this.setState({date:date})}
                      placeholder={'Date'}
                      placeholderTextColor={'black'}
                      style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <TextInput
                      value={this.state.currency}
                      onChangeText={(currency)=>this.setState({currency:currency})}
                      placeholder={'Currency'}
                      placeholderTextColor={'black'}
                      style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                      <TextInput
                        value={this.state.price}
                        onChangeText={(price)=>this.setState({price:price})}
                        placeholder={'Price'}
                        placeholderTextColor={'black'}
                        style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:25,borderRadius:10,padding:5}}/>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                      <TouchableOpacity
                        onPress={()=>this.removetransaction()}
                        style={{backgroundColor:'#DD5144',marginTop:20,width:100,height:30,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'black'}}>Remove</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            </PopupDialog>
            :
          ''}

        </View>
      </View>
    );
  }
}
