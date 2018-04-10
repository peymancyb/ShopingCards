import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView
  } from 'react-native';
import CardComponent from './src/components/card';
import styles from './src/components/style';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      datas:[
        {
          id:1,
          title: 'shoppping',
          icon: 'http://www.endlessicons.com/wp-content/uploads/2012/11/shopping-cart-icon.png',
          items:[
            {
              name: 'Zara man',
              date: 'sept 10',
              price: 100,
              currency: '$',
            },
            {
              name: 'Zara woman',
              date: 'sept 29',
              price: 100,
              currency: '$',
            },
          ]
        },
        {
          id:2,
          title: 'Transport',
          icon: 'https://cdn4.iconfinder.com/data/icons/dot/256/bus.png',
          items:[
            {
              name: 'Bmw',
              date: 'sept 12',
              price: 100,
              currency: '$',
            },
            {
              name: 'Mercedes-benz',
              date: 'sept 10',
              price: 140,
              currency: '$',
            },
            {
              name: 'Ford',
              date: 'sept 18',
              price: 90,
              currency: '$',
            }
          ],
        },
        {
          id:3,
          title: 'Travelling',
          icon: 'https://cdn3.iconfinder.com/data/icons/vacation-4/32/vacation_25-512.png',
          items:[
            {
              name: 'USA',
              date: 'sept 20',
              price: 1130,
              currency: '$',
            },
            {
              name: 'United Kingdom',
              date: 'sept 5',
              price: 2000,
              currency: '$',
            },
          ],
        }
      ],
      myKey: null,
    };
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
          <View style={styles.container}>
            <ScrollView>
            {cards}
          </ScrollView>
          </View>
      </Container>
    );
  }
}
