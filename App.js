import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
  } from 'react-native';
import CardComponent from './src/components/card';
import styles from './src/components/style';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Fab } from 'native-base';


console.disableYellowBox = true;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      active:false,
      datas:[],

      category:null,
      img:'',
      name:'',
      date:'2018',
      currency:'$',
      price:'',
      myKey: null,
    };

    this.addCategory = this.addCategory.bind(this);
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
    this.setState({
      datas: oldData
    },()=>this.setState({
      active: !this.state.active
    }));
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
    console.log(this.state.datas);
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
          {this.state.active ?
            <View style={[styles.container,{justifyContent:"center"}]}>
              <TextInput
                value={this.state.category}
                onChangeText={(category)=>this.setState({category:category})}
                placeholder={'Category Name'}
                placeholderTextColor={'white'}
                style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
                <TextInput
                  value={this.state.name}
                  onChangeText={(name)=>this.setState({name:name})}
                  placeholder={'Name'}
                  placeholderTextColor={'white'}
                  style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
                  <TextInput
                    value={this.state.date}
                    onChangeText={(date)=>this.setState({date:date})}
                    placeholder={'Date'}
                    placeholderTextColor={'white'}
                    style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
                    <TextInput
                      value={this.state.currency}
                      onChangeText={(currency)=>this.setState({currency:currency})}
                      placeholder={'Currency'}
                      placeholderTextColor={'white'}
                      style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
                      <TextInput
                        value={this.state.price}
                        onChangeText={(price)=>this.setState({price:price})}
                        placeholder={'Price'}
                        placeholderTextColor={'white'}
                        style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
                        <TextInput
                          value={this.state.img}
                          onChangeText={(img)=>this.setState({img:img})}
                          placeholder={'Image URL'}
                          placeholderTextColor={'white'}
                          style={{width:250,height:40,borderColor:"white",borderWidth:1,padding:10}}/>
              <View
                style={{justifyContent:"center",alignItems:"center"}}>
                  <TouchableOpacity
                    onPress={()=>this.addCategory()}
                    style={{alignItems:'center',justifyContent:'center',width:150,height:30,backgroundColor:"white",marginTop:10}}>
                    <Text style={{color:'black'}}>Add Category</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={}
                    style={{alignItems:'center',justifyContent:'center',width:150,height:30,backgroundColor:"white",marginTop:8}}>
                    <Text style={{color:'black'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.container}>
              <ScrollView>
              {cards}
            </ScrollView>
            </View>
          }
          <Fab
             active={this.state.active}
             direction="up"
             containerStyle={{ }}
             style={{ backgroundColor: '#191970' }}
             position="bottomRight"
             onPress={() => this.setState({ active: !this.state.active })}>
               <Icon name="add" style={{fontSize:30,color:'white'}} />
           </Fab>
      </Container>
    );
  }
}





// {
//   id:1,
//   title: 'shoppping',
//   icon: 'http://www.endlessicons.com/wp-content/uploads/2012/11/shopping-cart-icon.png',
//   items:[
//     {
//       name: 'Zara man',
//       date: 'sept 10',
//       price: 100,
//       currency: '$',
//     },
//     {
//       name: 'Zara woman',
//       date: 'sept 29',
//       price: 100,
//       currency: '$',
//     },
//   ]
// },
// {
//   id:2,
//   title: 'Transport',
//   icon: 'https://cdn4.iconfinder.com/data/icons/dot/256/bus.png',
//   items:[
//     {
//       name: 'Bmw',
//       date: 'sept 12',
//       price: 100,
//       currency: '$',
//     },
//     {
//       name: 'Mercedes-benz',
//       date: 'sept 10',
//       price: 140,
//       currency: '$',
//     },
//     {
//       name: 'Ford',
//       date: 'sept 18',
//       price: 90,
//       currency: '$',
//     }
//   ],
// },
// {
//   id:3,
//   title: 'Travelling',
//   icon: 'https://cdn3.iconfinder.com/data/icons/vacation-4/32/vacation_25-512.png',
//   items:[
//     {
//       name: 'USA',
//       date: 'sept 20',
//       price: 1130,
//       currency: '$',
//     },
//     {
//       name: 'United Kingdom',
//       date: 'sept 5',
//       price: 2000,
//       currency: '$',
//     },
//   ],
// }
