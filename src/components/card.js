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
import store from '../../redux/main'
import {updateTransaction} from '../../redux/actions/transactionAction';
import {Provider,connect} from 'react-redux';



class CardComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      datas:[],
      isOn: false
    };
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount(){
    this.setState({
      datas: this.props.transaction.transaction
    });
  }

  showDetails(){
    this.setState((prevState)=>({
        isOn: !prevState.isOn
      }));
  }

  render() {
    var itemInArray,numOfItems ;
    this.state.datas.map((currentItem,currentIndex)=>{
      if(currentItem.items){
        numOfItems = currentItem.items.length;
      }else{
        numOfItems = 0;
      }
      itemInArray = <ItemComponent key={`key${currentItem.id}`} item = {currentItem} itemArray = {currentItem.items}/>;
    });
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



export default connect((store)=>{
  return{
    transaction: store.transaction
  }
})(CardComponent);
