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
  }
});


export default styles;
