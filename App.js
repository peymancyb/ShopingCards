import React,{Component} from 'react';
import {
  StyleSheet,
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


console.disableYellowBox = true;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      showCondition:false,
      active:false,
      activeFab:false,
      datas:[],
      isRemove:false,
      category:null,
      img:'',
      name:'',
      date:'',
      currency:'',
      price:'',
      myKey: null,
      removeCategory:'',
    };

    this.addCategory = this.addCategory.bind(this);
    this.options = this.options.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.saveKey = this.saveKey.bind(this);
    this.resetKey = this.resetKey.bind(this);
    this.getKey = this.getKey.bind(this);

  }

  addCategory(){
    let rand = Math.floor(Math.random()*1000)+1;
    let obj = {
      id: rand,
      title: this.state.category,
      icon: this.state.img,
      items:[
        {
          name: this.state.name,
          date: this.state.date,
          price: this.state.price,
          currency: this.state.currency,
        }
      ]
    };
    let oldData = this.state.datas;
    oldData.push(obj);

    this.saveKey(JSON.stringify(oldData));

    this.setState({
      datas: oldData
    },()=>this.setState({
      activeFab: false,
      showCondition: false,
      active: !this.state.active,
      category:null,
      img:'',
      name:'',
      date:'',
      currency:'',
      price:'',
      myKey: null,
      removeCategory:'',
    }));
  }



removeCategory(){
  let toBeRemoved = this.state.removeCategory;
  let oldData = this.state.datas;
  var indexOfItem = null;

  oldData.map((currentItem,currentIndex)=>{
    if(currentItem.title === this.state.removeCategory){
      indexOfItem = currentIndex;
    };
  });

  if (indexOfItem > -1) {
    oldData.splice((indexOfItem), 1);
  }
  console.log(oldData);

  this.saveKey(JSON.stringify(oldData));

  this.setState({
    datas: oldData
  },()=>this.setState({
    activeFab: false,
    isRemove: !this.state.active,
    showCondition: false,
    category:null,
    img:'',
    name:'',
    date:'2018',
    currency:'$',
    price:'',
    myKey: null,
    removeCategory:'',
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
        <Text style={styles.transactionText}>--- Transaction --- </Text>
        <TextInput
          value={this.state.name}
          onChangeText={(name)=>this.setState({name:name})}
          placeholder={'Name'}
          placeholderTextColor={'white'}
          style={styles.inputStyle}/>
          <TextInput
            value={this.state.date}
            onChangeText={(date)=>this.setState({date:date})}
            placeholder={'Date'}
            placeholderTextColor={'white'}
            style={styles.inputStyle}/>
            <TextInput
              value={this.state.currency}
              onChangeText={(currency)=>this.setState({currency:currency})}
              placeholder={'Currency'}
              placeholderTextColor={'white'}
              style={styles.inputStyle}/>
              <TextInput
                value={this.state.price}
                onChangeText={(price)=>this.setState({price:price})}
                placeholder={'Price'}
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


componentDidMount(){
  const data = this.state.datas;
  const items = JSON.stringify(data);
  this.saveKey(items);
}



  render() {
    let cards = this.state.datas.map((currentItem , currentIndex)=>{
      return(
        <CardComponent
          key={`key${currentItem.id}`}
          title = {currentItem.title}
          items = {currentItem.items}
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


            {this.state.showCondition ?
              this.options()
              :
              <View style={styles.container}>
                <ScrollView>
                {cards}
              </ScrollView>
              </View>
            }


            <Footer style={{backgroundColor:"#191970"}}>
              <FooterTab>
                <TouchableOpacity
                   onPress={() => this.setState({activeFab: false ,showCondition: true, active: true},()=>this.setState({}))}
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
