import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:

            const updatedItem = action.payload
            
            const itemExists = state.cartItems.find(curr => curr.product === updatedItem.product)
        
            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(curr => curr.product === itemExists.product ? updatedItem : curr)
                }   
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, updatedItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        default:
            return state
    }
    
}