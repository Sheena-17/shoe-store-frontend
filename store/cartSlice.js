const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: 'cart',
    initialState : {
         cartItems: []
    },
    reducers: {
        addToCart : (state,action) => {
            const item = state.cartItems.find((p) =>p.id === action.payload.id);
            if(item){
                item.quantity++;
                item.attributes.price = item.quantity*item.oneQuantityPrice;
            }
            else{
                state.cartItems.push({...action.payload,quantity: 1});
            }

            console.log("action.payload is: - " , action.payload);
            console.log("cartItems are in the CreateSlice is : - " , state.cartItems);
        },
        updateCart: (state,action) => {
            state.cartItems = state.cartItems.map((p)=>{
                    if(p.id === action.payload.id){
                        if(action.payload.key === "quantity"){
                            p.attributes.price = p.oneQuantityPrice*action.payload.value;
                        }
                         return { ...p,[action.payload.key]: action.payload.value}
                    }
                    return p;
            })
        },
       removeFromCart: (state,action) =>{
            state.cartItems = state.cartItems.filter((p)=>p.id !=action.payload.id)
       },
    }
})
export const { addToCart , updateCart , removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;