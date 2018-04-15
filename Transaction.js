import React,{Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  ScrollView,
  Modal,
  TouchableOpacity,
  } from 'react-native';
import CardComponent from './src/components/card';
import styles from './src/components/style';
import {
  Footer,
  FooterTab,
  Container,
  Header,
  Left,
  Form,
  Picker,
  Body,
  Right,
  Button,
  Icon,
  Title,Fab } from 'native-base';
import {updateTransaction} from './redux/actions/transactionAction';
import {connect} from 'react-redux';
import store from './redux/main'
import ImagePicker from 'react-native-image-picker';
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




class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {
      isActive:false,
      category:'',
      removeCategory:'',
      datas:[],
      img:'',
      myKey: null,
      showOption:false,
    };
    this.addCategory = this.addCategory.bind(this);
    this.options = this.options.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  componentDidMount(){
    this.setState({
      datas: this.props.transaction
    },()=>{
      const data = this.state.datas;
      const items = JSON.stringify(data);
    });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.transaction.transaction);
    this.setState({
      datas: nextProps.transaction.transaction
    })
  }

  addCategory(){
    let rand = Math.floor(Math.random()*1000)+1;
    let obj = {
      id: rand,
      title: this.state.category,
      icon: this.state.img,
      items:[]
    };
    let newArr = this.state.datas;
    newArr.push(obj);
    this.props.dispatch(updateTransaction(newArr));
    this.setState({
      datas: newArr
    },()=>this.setState({
      showOption:false,
      isActive: false,
      category:'',
      removeCategory:'',
      img:'',
      date:'',
      myKey: null,
    }));
  }
  removeCategory(){
    let toBeRemoved = this.state.removeCategory;
    let newArr = this.state.datas;
    var tempArr = newArr.filter((ell)=>{
      if(ell.title === toBeRemoved){
        return false
      }else{
        return true
      }
    });
    this.props.dispatch(updateTransaction(tempArr));
    this.setState({
      datas: tempArr
    },()=>this.setState({
      showOption:false,
      isActive: false,
      removeCategory:'',
      category:'',
      img:'',
      date:'',
      myKey: null,
    }));
  }

options(){
  if(!this.state.isActive){
    return(
      <View style={[styles.container,{justifyContent:"center"}]}>
        <Text style={{color:'black',fontSize:18}}> Delete Category</Text>
        <TextInput
          value={this.state.removeCategory}
          onChangeText={(removeCategory)=>this.setState({removeCategory:removeCategory})}
          placeholder={'Category Name'}
          placeholderTextColor={'inputStyle'}
          style={styles.inputStyle}/>
          <View style={{justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity
                onPress={()=>this.removeCategory()}
                style={styles.addBtn}>
                <Text style={{color:'black'}}>Remove Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.setState({showOption:false})}
                style={styles.cancelBtn}>
                <Text style={{color:'black'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }

  if(this.state.isActive){
    return (
      <View style={[styles.container,{justifyContent:"center"}]}>
      <TextInput
        value={this.state.category}
        onChangeText={(category)=>this.setState({category:category})}
        placeholder={'Category Name'}
        placeholderTextColor={'black'}
        style={styles.inputStyle}/>
      <TextInput
        value={this.state.img}
        onChangeText={(img)=>this.setState({img:img})}
        placeholder={'Image URL'}
        placeholderTextColor={'black'}
        style={styles.inputStyle}/>
      <View style={{justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity
            onPress={()=>this.addCategory()}
            style={styles.addBtn}>
            <Text style={{color:'black'}}>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.setState({showOption:false})}
            style={styles.cancelBtn}>
            <Text style={{color:'black'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}

  render() {
    var cards = this.state.datas.map((currentItem)=>
      <CardComponent
         key = {`key${currentItem.id}`}
         id = {currentItem.id}
         title = {currentItem.title}
         icon = {currentItem.icon}
         items = {currentItem.items} />
    );
    return (
      <Container style={{flex:1,backgroundColor:'lightblue'}}>
        <Header
          style={{backgroundColor:'#191970'}}>
          <Left>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Button transparent>
                <Icon style={{color:'white'}} name='menu' />
              </Button>
              <Text style={{color:'white',fontSize:18,fontWeight:"bold",marginLeft:30,textAlign:'center',paddingTop:5}}>History</Text>
            </View>
          </Left>
        </Header>

          {
            this.state.showOption ?
              this.options()
            :
              <Body>
                <ScrollView>
                  {cards}
                </ScrollView>
              </Body>
          }

        <Footer style={{backgroundColor:"#191970"}}>
          <FooterTab>
            <TouchableOpacity
               onPress={() => this.setState({isActive: true,showOption: true},()=>this.options())}
               style={styles.addStyle}>
              <Icon name="add" style={{fontSize:45,color:'white'}} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({isActive: false,showOption: true},()=>this.options())}
              style={styles.removeStyle}>
              <Icon style={{fontSize:45}} name="remove" />
            </TouchableOpacity>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const TransactionComponent = connect((store)=>{
  return{
    transaction: store.transaction
  };
})(Transaction);


export default TransactionComponent;
