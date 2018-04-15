import React,{Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal
} from 'react-native';
import styles from './style';
import {
  Icon,
  Right,
  Picker,
  Form,
  Container
} from 'native-base';
import ItemComponent from './transaction';
import store from '../../redux/main'
import {updateTransaction} from '../../redux/actions/transactionAction';
import {Provider,connect} from 'react-redux';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
 } from 'react-native-popup-dialog';
 import DatePicker from 'react-native-datepicker';




const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });




class CardComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      datas:[],
      items:[],
      isOn: false,
      editPopup: false,
      isAdd:false,
      name:'',
      currency:'',
      date:'',
      price:'',
      modalVisible:false,
    };
    this.showDetails = this.showDetails.bind(this);
    this.modalView = this.modalView.bind(this);
    this.addtransaction = this.addtransaction.bind(this);
    this.removetransaction = this.removetransaction.bind(this);
  }

  componentDidMount(){
    this.setState({
      datas: this.props.transaction,
      items: this.props.items
    });
  }



  addtransaction(){
    let mainObj = {
      id: this.props.id,
      title: this.props.title
    };
    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };

    let newArr = this.state.datas.map((currentItem,currentIndex)=>{
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
      editPopup:false,
      datas: newArr,
      name:'',
      currency:'',
      date:'',
      price:'',
      modalVisible:false
    });

  }

  removetransaction(){
    let mainObj = {
      id: this.props.id,
      title: this.props.title
    };
    let obj = {
      currency: this.state.currency,
      date: this.state.date,
      name: this.state.name,
      price: this.state.price
    };

    var tempArr = this.state.datas.map((curr)=>{
      let newObj = {
        items: curr.items.filter((ell)=>{
              if(ell.currency === obj.currency || ell.date === obj.date ||  ell.name === obj.name || ell.price === obj.price){
                 return false;
              }else{
                 return true;
               }
             }
          )
      };
      return Object.assign({},curr,newObj);
    });


    this.props.dispatch(updateTransaction(tempArr));

    this.setState({
      editPopup:false,
      datas: tempArr,
      name:'',
      currency:'',
      date:'',
      price:'',
      modalVisible:false
    });
  }


  modalView(){
    if(this.state.isAdd){
      return(
        <View>
            <Modal
              animationType={'fade'}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => console.log('Modal has been closed.')}>
              <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
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
            </Modal>
        </View>
      );
    }
    if(!this.state.isAdd){
      return(
        <View>
          <View>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
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
            </Modal>
          </View>
        </View>
      );
    }
  }

  showDetails(){
    this.setState((prevState)=>({
        isOn: !prevState.isOn
      }));
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      datas: this.props.transaction,
      items: nextProps.items
    })
  }

  render() {
    var numOfItems = this.state.items.length;
    var itemInArray = this.state.items.map((currentItem)=>
    <ItemComponent
      key={`key${currentItem.name}`}
      currency = {currentItem.currency}
      date = {currentItem.date}
      name = {currentItem.name}
      price = {currentItem.price}
    />);
    return (
        <View style={styles.card}>
          <TouchableOpacity
           onPress={()=>this.showDetails()}>
           <View style={styles.cardHeader}>
             <Image
               style={styles.cardPic}
               source={{uri: this.props.icon}}
             />
             <View style={{flexDirection:"column"}}>
               <Text style={styles.title}>{this.props.title}</Text>
               <Text style={{color:'black',marginTop:15}}>{numOfItems} transaction</Text>
             </View>
           </View>
          </TouchableOpacity>

          {this.state.editPopup ?
            <View>
              {this.modalView()}
            </View>
            : ''}

          {
            (this.state.isOn)?
              <View>
              {itemInArray}
              <View>
              <View style={{flexDirection:"row"}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',marginLeft:10,marginTop:5,marginBottom:5}}>
                    <TouchableOpacity
                      onPress = {(item)=>console.log(item)}
                      onPress={()=>this.setState({isAdd:false,editPopup: true,modalVisible:true})}
                      style={{justifyContent:'center',alignItems:'center',backgroundColor:'#DD5144',borderRadius:15,width:30,height:30}}>
                      <Icon style={{fontSize:30,color:'black'}} name="remove"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:10,marginTop:5,marginBottom:5}}>
                    <TouchableOpacity
                      onPress={()=>this.setState({isAdd:true , editPopup: true, modalVisible:true})}
                      style={{justifyContent:'center',alignItems:'center',backgroundColor:'#34A34F',borderRadius:15,width:30,height:30}}>
                      <Icon style={{fontSize:30,color:'white'}} name="add"/>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
           </View> : ''}
        </View>
    );
  }
}

export default connect((store)=>{
  return{
    transaction: store.transaction
  }
})(CardComponent);
