const transactionReducer = (state = [] , action)=>{
  switch (action.type) {
    case "update_transaction":
      return {...state,transaction:action.payload}
      break;
    default:
    return state;
  }
};

export default transactionReducer;
