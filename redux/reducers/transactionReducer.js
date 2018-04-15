initialState = [
  {
    id: 1,
    title: "cars",
    icon: '',
    items:[
      {
        name: "BMW",
        date: 2018,
        price: 2000,
        currency: '$',
      },
      {
        name: "Benz",
        date: 2018,
        price: 2000,
        currency: '$',
      }
    ]
  },
  {
    id: 2,
    title: "plane",
    icon: '',
    items:[
      {
        name: "air",
        date: 2018,
        price: 2000,
        currency: '$',
      }
    ]
  }
];


const transactionReducer = (state = initialState , action)=>{
  switch (action.type) {
    case "update_transaction":
      return {...state,transaction:action.payload}
      break;
    default:
    return state;
  }
};

export default transactionReducer;
