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
import ItemComponent from './transaction';




export default class CardComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      isOn: false
    };
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount(){
    this.setState({
      items: this.props.items
    });
  }

  showDetails(){
    this.setState((prevState)=>({
        isOn: !prevState.isOn
      }));
  }
  
  render() {
    let total = 0;
    var numOfItems = 0;
    var itemInArray = '';
    if(this.state.items !== 'undefined'){
      numOfItems = this.state.items.length;
      itemInArray = this.state.items.map((currentItem,currentIndex)=>{
        total = total + currentItem.price;
        return(
          <ItemComponent
            key={`key${currentIndex}`}
            name={currentItem.name}
            date={currentItem.date}
            price={currentItem.price}
            currency={currentItem.currency}
            total={numOfItems}
            items={this.state.items}
          />
        );
      });
    }else{
      numOfItems = 0;
      itemInArray = ''
    }

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
             <Text style={{color:'white',marginTop:15}}>{numOfItems} transaction</Text>
           </View>
         </View>
       </TouchableOpacity>
         {(this.state.isOn)?<View>{itemInArray}</View>: ''}


      </View>
    );
  }
}
