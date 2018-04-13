export function updateTransaction(newTransaction){
  return{
    type:'update_transaction',
    payload: newTransaction
  }
};
