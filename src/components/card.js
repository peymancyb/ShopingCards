import React,{Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './style';


const ItemComponent = (props) =>{
  return(
    <View>
      <View style={styles.details}>
        <Text style={{color:'white',flex:3}}>{props.name}</Text>
        <View style={styles.price}>
          <Text style={{color:'white'}}>{props.date}</Text>
          <Text style={{marginLeft:20,color:'white'}}>{props.currency}{props.price}</Text>
        </View>
      </View>
    </View>
  );
}


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
    console.log(this.state.items);
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
