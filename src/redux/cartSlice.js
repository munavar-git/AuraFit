import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const existingItem = state.items.find((item) =>
                item.id === product.id &&
                item.size === product.size
            )

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1
                })
            }
        },
        increaseQuantity: (state, action) => {
            const { id, size } = action.payload;
            const item = state.items.find((item) =>
                item.id === id &&
                item.size === size
            )
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }

        },
        decreaseQuantity: (state, action) => {
            const { id, size } = action.payload;
            const item = state.items.find((item) =>
                id === item.id &&
                size === item.size
            )
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload
            state.items = state.items.filter((item) =>
                !(id === item.id &&
                size === item.size)
            )

        },
        clearCart: (state) => {
            state.items = [];
        }


    }
})


export default cartSlice.reducer
export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions