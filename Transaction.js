import React,{Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  ScrollView,
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
  Body,
  Right,
  Button,
  Icon,
  Title,Fab } from 'native-base';
import {updateTransaction} from './redux/actions/transactionAction';
import {Provider,connect} from 'react-redux';
import store from './redux/main'
import ImagePicker from 'react-native-image-picker';

console.disableYellowBox = true;

class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCondition:false,
      active:false,
      activeFab:false,
      datas:[],
      isRemove:false,
      category:'',
      img:'',
      removeCategory:'',
      myKey: null,
    };

    this.addCategory = this.addCategory.bind(this);
    this.options = this.options.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.saveKey = this.saveKey.bind(this);
    this.resetKey = this.resetKey.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  componentDidMount(){
    this.setState({
      datas: this.props.transaction
    },()=>{
      const data = this.state.datas;
      const items = JSON.stringify(data);
      this.saveKey(items);
    });
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
      activeFab: false,
      showCondition: false,
      active: !this.state.active,
      category:'',
      img:'',
      date:'',
      removeCategory:'',
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
  this.saveKey(JSON.stringify(tempArr));
  this.props.dispatch(updateTransaction(tempArr));
  this.setState({
    datas: tempArr
  },()=>this.setState({
    activeFab: false,
    isRemove: !this.state.active,
    showCondition: false,
    category:'',
    img:'',
    removeCategory:'',
    myKey: null,
  }));
}

options(){
  if(this.state.isRemove){
    return(
      <View style={[styles.container,{justifyContent:"center"}]}>
        <Text style={{color:'white',fontSize:18}}> Delete Category</Text>
        <TextInput
          value={this.state.removeCategory}
          onChangeText={(removeCategory)=>this.setState({removeCategory:removeCategory})}
          placeholder={'Category Name'}
          placeholderTextColor={'white'}
          style={styles.inputStyle}/>
          <View style={{justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity
                onPress={()=>this.removeCategory()}
                style={styles.addBtn}>
                <Text style={{color:'black'}}>Remove Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.setState({isRemove:false,showCondition:false})}
                style={styles.cancelBtn}>
                <Text style={{color:'black'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
  if(this.state.active){
    return (
      <View style={[styles.container,{justifyContent:"center"}]}>
      <TextInput
        value={this.state.category}
        onChangeText={(category)=>this.setState({category:category})}
        placeholder={'Category Name'}
        placeholderTextColor={'white'}
        style={styles.inputStyle}/>
      <TextInput
        value={this.state.img}
        onChangeText={(img)=>this.setState({img:img})}
        placeholder={'Image URL'}
        placeholderTextColor={'white'}
        style={styles.inputStyle}/>
      <View style={{justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity
            onPress={()=>this.addCategory()}
            style={styles.addBtn}>
            <Text style={{color:'black'}}>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.setState({active:false,showCondition:false})}
            style={styles.cancelBtn}>
            <Text style={{color:'black'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
    </View>);
  }
}

  async getKey() {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    this.setState({myKey: value});
  } catch (error) {
    console.log("Error retrieving data" + error);
  }
}

async saveKey(value) {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', value);
  } catch (error) {
    console.log("Error saving data" + error);
  }
}

async resetKey() {
  try {
    await AsyncStorage.removeItem('@MySuperStore:key');
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    this.setState({myKey: value});
  } catch (error) {
    console.log("Error resetting data" + error);
  }
}

  render() {
    let cards = this.state.datas.map((currentItem , currentIndex)=>{
      return(
        <CardComponent
          key={`key${currentItem.id}`}
          title = {currentItem.title}
          icon = {currentItem.icon}
         />
      )
    });
    return (
      <Container>
        <Header
          style={{backgroundColor:'#191970'}}>
          <Left>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Button transparent>
                <Icon style={{color:'white'}} name='menu' />
              </Button>
              <Text style={{color:'white',fontSize:18,fontWeight:"bold",marginLeft:30,textAlign:'center',paddingTop:5,}}>History</Text>
            </View>
          </Left>
        </Header>

            {
              this.state.showCondition ?
              this.options()
              :
              <View style={styles.container}>
                <ScrollView>
                  {
                    (this.state.datas.length === 0)?
                      <View style={[styles.container,{marginTop:300}]}>
                        <Text
                          style={{fontSize:20,color:'white'}}
                          onPress={() => this.setState({activeFab: false ,showCondition: true, active: true})}
                          >
                          Add Transaction
                        </Text>
                      </View>
                      :
                    cards
                  }
                </ScrollView>
              </View>
            }

            <Footer style={{backgroundColor:"#191970"}}>
              <FooterTab>
                <TouchableOpacity
                   onPress={() => this.setState({activeFab: false ,showCondition: true, active: true})}
                   style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#34A34F' }}>
                  <Icon name="add" style={{fontSize:45,color:'white'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({activeFab: false ,showCondition: true,isRemove: true})}
                  style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#DD5144' }}>
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
