//
//   async getKey() {
//   try {
//     const value = await AsyncStorage.getItem('@MySuperStore:key');
//     this.setState({myKey: value});
//   } catch (error) {
//     console.log("Error retrieving data" + error);
//   }
// }
//
// async saveKey(value) {
//   try {
//     await AsyncStorage.setItem('@MySuperStore:key', value);
//   } catch (error) {
//     console.log("Error saving data" + error);
//   }
// }
//
// async resetKey() {
//   try {
//     await AsyncStorage.removeItem('@MySuperStore:key');
//     const value = await AsyncStorage.getItem('@MySuperStore:key');
//     this.setState({myKey: value});
//   } catch (error) {
//     console.log("Error resetting data" + error);
//   }
// }

  //
  //
  // removePopup(){
  //   if(this.state.remove){
  //     return(
  //       <PopupDialog
  //         containerStyle={{zIndex: 10, elevation: 10}}
  //         dialogTitle={<DialogTitle title="Remove Transaction" />}
  //         show={this.state.remove}
  //         ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  //         dialogAnimation={scaleAnimation}
  //       >
  //         <View style={{zIndex:10,justifyContent:'center',alignItems:'center'}}>
  //             <TextInput
  //               value={this.state.name}
  //               onChangeText={(name)=>this.setState({name:name})}
  //               placeholder={'Transaction'}
  //               placeholderTextColor={'#cacaca'}
  //               style={{textAlign:'center',borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
  //
  //
  //               <DatePicker
  //                       style={{width: 250}}
  //                       date={this.state.date}
  //                       mode="date"
  //                       placeholder="select date"
  //                       format="YYYY-MM-DD"
  //                       confirmBtnText="Confirm"
  //                       cancelBtnText="Cancel"
  //                       showIcon = {false}
  //                       customStyles={{
  //                         dateInput: {
  //                           width: 250,
  //                           height:32,
  //                           borderColor:'#DD5144',
  //                           marginLeft: 0,
  //                           padding:5,
  //                           marginTop:20,
  //                           borderRadius:10,
  //                           borderWidth:1,
  //                         }
  //                       }}
  //                       onDateChange={(date) => {this.setState({date: date})}}
  //                     />
  //
  //                 <Form>
  //                   <Picker
  //                     mode="dropdown"
  //                     style={{borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5,justifyContent:"center",alignItems:"center"}}
  //                     placeholder="Currency"
  //                     placeholderStyle={{ color: "#bfc6ea" }}
  //                     placeholderIconColor="#007aff"
  //                     selectedValue={this.state.currency}
  //                     onValueChange={(value)=>this.setState({currency:value})}
  //                   >
  //                     <Picker.Item label="Dollar" value="$" />
  //                     <Picker.Item label="Pound" value="£" />
  //                     <Picker.Item label="Euro" value="€" />
  //                   </Picker>
  //                 </Form>
  //
  //                 <TextInput
  //                   value={this.state.price}
  //                   onChangeText={(price)=>this.setState({price:price})}
  //                   placeholder={'Price'}
  //                   placeholderTextColor={'#cacaca'}
  //                   style={{textAlign:'center',borderColor:'#DD5144',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
  //               <View style={{justifyContent:"center",alignItems:"center"}}>
  //                 <TouchableOpacity
  //                   onPress={()=>this.removetransaction()}
  //                   style={{backgroundColor:'#DD5144',marginTop:20,width:100,height:30,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
  //                   <Text style={{color:'black'}}>Remove</Text>
  //                 </TouchableOpacity>
  //               </View>
  //         </View>
  //       </PopupDialog>
  //     );
  //   }else{
  //     return(
  //       <View>
  //
  //       </View>
  //     )
  //   }
  // }
  //
  //
  // {this.state.show?
  //   <PopupDialog
  //     containerStyle={{zIndex: 10, elevation: 10}}
  //     dialogTitle={<DialogTitle title="Add Transaction" />}
  //     show={this.state.show}
  //     ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  //     dialogAnimation={scaleAnimation}
  //   >
  //     <View style={{zIndex:10,justifyContent:'center',alignItems:'center'}}>
  //         <TextInput
  //           value={this.state.name}
  //           onChangeText={(name)=>this.setState({name:name})}
  //           placeholder={'Transaction'}
  //           placeholderTextColor={'#cacaca'}
  //           style={{textAlign:'center',borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
  //           <DatePicker
  //                   style={{width: 250}}
  //                   date={this.state.date}
  //                   mode="date"
  //                   placeholder="select date"
  //                   format="YYYY-MM-DD"
  //                   confirmBtnText="Confirm"
  //                   cancelBtnText="Cancel"
  //                   showIcon = {false}
  //                   customStyles={{
  //                     dateInput: {
  //                       width: 250,
  //                       height:32,
  //                       borderColor:'#34A34F',
  //                       marginLeft: 0,
  //                       padding:5,
  //                       marginTop:20,
  //                       borderRadius:10,
  //                       borderWidth:1,
  //                     }
  //                   }}
  //                   onDateChange={(date) => {this.setState({date: date})}}
  //                 />
  //
  //                 <Form>
  //                   <Picker
  //                     mode="dropdown"
  //                     style={{borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5,justifyContent:"center",alignItems:"center"}}
  //                     placeholder="Currency"
  //                     placeholderStyle={{ color: "#bfc6ea" }}
  //                     placeholderIconColor="#007aff"
  //                     selectedValue={this.state.currency}
  //                     onValueChange={(value)=>this.setState({currency:value})}
  //                   >
  //                     <Picker.Item label="Dollar" value="$" />
  //                     <Picker.Item label="Pound" value="£" />
  //                     <Picker.Item label="Euro" value="€" />
  //                   </Picker>
  //                 </Form>
  //
  //             <TextInput
  //               value={this.state.price}
  //               onChangeText={(price)=>this.setState({price:price})}
  //               placeholder={'Price'}
  //               placeholderTextColor={'#cacaca'}
  //               style={{textAlign:'center',borderColor:'#34A34F',borderWidth:1,marginTop:20,width:250,height:32,borderRadius:10,padding:5}}/>
  //           <View style={{justifyContent:"center",alignItems:"center"}}>
  //             <TouchableOpacity
  //               onPress={()=>this.addtransaction()}
  //               style={{backgroundColor:'#34A34F',marginTop:20,width:100,height:30,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
  //               <Text style={{color:'white'}}>Add</Text>
  //             </TouchableOpacity>
  //           </View>
  //     </View>
  //   </PopupDialog>
  //   :
  // ''}
