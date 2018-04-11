import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';


const window = Dimensions.get('window');

const width = window.width;
const height = window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5067FF',
    alignItems: 'center',
    // justifyContent: 'center',

  },
  card:{
    borderRadius:5,
    marginTop:20,
    width: width - 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  cardHeader:{
    borderBottomWidth:1,
    borderColor:'white',
    flexDirection:'row',
  },
  cardPic:{
    backgroundColor:'white',
    borderRadius:40,
    width:80,
    height:80,
    borderColor:'white',
    borderWidth:2,
    margin:10,
  },
  title:{
    marginTop:20,
    fontSize:18,
    color:'white',
    fontWeight:'bold',
  },
  details:{
    flexDirection:'row',
    padding:10,
  },
  price:{
    flex:3,
    flexDirection:'row',
    marginLeft:120,
    justifyContent: 'space-between',
  },
  inputStyle:{
    width:250,
    height:40,
    borderColor:"white",
    borderWidth:1,
    padding:10,
    marginTop:10,
    borderRadius:5,
    color:'white',
  },
  addBtn:{
    alignItems:'center',
    justifyContent:'center',
    width:150,
    height:30,
    backgroundColor:"white",
    marginTop:15,
    borderRadius:5,
  },
  cancelBtn:{
    alignItems:'center',
    justifyContent:'center',
    width:150,
    height:30,
    backgroundColor:"white",
    marginTop:8,
    borderRadius:5,
  },
  transactionText:{
    color:'white',
    fontSize:18,
    marginTop:5,
  }
});


export default styles;
