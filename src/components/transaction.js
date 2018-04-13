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
 import DatePicker from 'react-native-datepicker';


const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class ItemComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      item: null,
      show:false,
      remove:false,
      name:'',
      currency:'',
      date:'',
      price:'',
      itemArray:[],
    };
    this.addtransaction = this.addtransaction.bind(this);
    this.removetransaction = this.removetransaction.bind(this);
  }

  componentDidMount(){
    this.setState({
      items: this.props.transaction.transaction,
      item: this.props.item,
      itemArray: this.props.itemArray,
    });
  }


  addtransaction(){
    let mainObj = this.state.item;
    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };

    let newArr = this.state.items.map((currentItem,currentIndex)=>{
        if(currentItem.id === mainObj.id && currentItem.title === mainObj.title){
           return {
              ...currentItem,
              items: [...currentItem.items, obj]
           };
        }
        else return currentItem;
      });

    this.props.dispatch(updateTransaction(newArr));

    this.setState({
      show:false,
      items: newArr,
      name:'',
      currency:'',
      date:'',
      price:'',
    });

  }

  removetransaction(){
    let mainObj = this.state.item;
    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };

    let newArr = this.state.items;

    var tempArr = newArr.map((curr)=>{
      let newObj = {
        items: curr.items.filter((ell)=>{
              if(ell.currency === obj.currency && ell.date === obj.date &&  ell.name === obj.name && ell.price === obj.price){
                 return false;
              }else{
                 return true;
               }
             }
          )
      };
      return Object.assign({},curr,newObj);
    });


    this.setState({
      remove:false,
      items: tempArr,
      name:'',
      currency:'',
      date:'',
      price:'',
    });

  }

  render(){
    let transactions = this.state.items.map((currentItem)=>{
      return currentItem.items.map((currentDetails)=>{
        let rand = Math.floor(Math.random()*1000) + 1;

        return (
            <View style={styles.details} key={`currentItem${currentItem.id * rand}`}>
              <Text style={{color:'white',flex:3}}>{currentDetails.name}</Text>
              <View style={styles.price}>
                <Text style={{color:'white'}}>{currentDetails.date}</Text>
                <Text style={{marginLeft:20,color:'white'}}>{currentDetails.currency}{currentDetails.price}</Text>
              </View>
            </View>
        );
      });
    });
    console.log(JSON.stringify(this.state.items));
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
          style={{position:'absolute',bottom:320}}>
          {this.state.show?
            <PopupDialog
              containerStyle={{zIndex: 10, elevation: 10}}
              dialogTitle={<DialogTitle title="Add Transaction" />}
              show={this.state.show}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={scaleAnimation}
            >
              <View style={{zIndex:10,justifyContent:'center',alignItems:'center'}}>
                  <TextInput
                    value={this.state.name}
                    onChangeText={(name)=>this.setState({name:name})}
                    placeholder={'Transaction'}
                    placeholderTextColor={'#cacaca'}
                    style={{textAlign:'center',borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
                    <DatePicker
                            style={{width: 250}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon = {false}
                            customStyles={{
                              dateInput: {
                                width: 250,
                                height:32,
                                borderColor:'#34A34F',
                                marginLeft: 0,
                                padding:5,
                                marginTop:20,
                                borderRadius:10,
                                borderWidth:1,
                              }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                          />

                          <Form>
                            <Picker
                              mode="dropdown"
                              style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5,justifyContent:"center",alignItems:"center"}}
                              placeholder="Currency"
                              placeholderStyle={{ color: "#bfc6ea" }}
                              placeholderIconColor="#007aff"
                              selectedValue={this.state.currency}
                              onValueChange={(value)=>this.setState({currency:value})}
                            >
                              <Picker.Item label="Dollar" value="$" />
                              <Picker.Item label="Pound" value="£" />
                              <Picker.Item label="Euro" value="€" />
                            </Picker>
                          </Form>

                      <TextInput
                        value={this.state.price}
                        onChangeText={(price)=>this.setState({price:price})}
                        placeholder={'Price'}
                        placeholderTextColor={'#cacaca'}
                        style={{textAlign:'center',borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
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
              containerStyle={{zIndex: 10, elevation: 10}}
              dialogTitle={<DialogTitle title="Remove Transaction" />}
              show={this.state.remove}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={scaleAnimation}
            >
              <View style={{zIndex:10,justifyContent:'center',alignItems:'center'}}>
                  <TextInput
                    value={this.state.name}
                    onChangeText={(name)=>this.setState({name:name})}
                    placeholder={'Transaction'}
                    placeholderTextColor={'#cacaca'}
                    style={{textAlign:'center',borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>


                    <DatePicker
                            style={{width: 250}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon = {false}
                            customStyles={{
                              dateInput: {
                                width: 250,
                                height:32,
                                borderColor:'#DD5144',
                                marginLeft: 0,
                                padding:5,
                                marginTop:20,
                                borderRadius:10,
                                borderWidth:1,
                              }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                          />

                      <Form>
                        <Picker
                          mode="dropdown"
                          style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5,justifyContent:"center",alignItems:"center"}}
                          placeholder="Currency"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.currency}
                          onValueChange={(value)=>this.setState({currency:value})}
                        >
                          <Picker.Item label="Dollar" value="$" />
                          <Picker.Item label="Pound" value="£" />
                          <Picker.Item label="Euro" value="€" />
                        </Picker>
                      </Form>

                      <TextInput
                        value={this.state.price}
                        onChangeText={(price)=>this.setState({price:price})}
                        placeholder={'Price'}
                        placeholderTextColor={'#cacaca'}
                        style={{textAlign:'center',borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
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


export default connect((store)=>{
  return{
    transaction: store.transaction
  }
})(ItemComponent);


// let newRow = currentItem.splice(currentItem.findIndex(e => e.name === obj.name),1);
// return {
//    ...currentItem,
//    items: newRow
// };
