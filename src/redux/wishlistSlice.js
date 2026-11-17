import { createSlice } from "@reduxjs/toolkit";

const getSavedWishlist = () => {
    try {
        const saved = localStorage.getItem("aurafit_wishlist");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const initialState = {
    items: getSavedWishlist(),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.items.some((item) => String(item.id) === String(product.id));
            if (!exists) {
                state.items.push(product);
                localStorage.setItem("aurafit_wishlist", JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => String(item.id) !== String(productId));
            localStorage.setItem("aurafit_wishlist", JSON.stringify(state.items));
        },
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex((item) => String(item.id) === String(product.id));
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(product);
            }
            localStorage.setItem("aurafit_wishlist", JSON.stringify(state.items));
        },
        setWishlist: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
            localStorage.setItem("aurafit_wishlist", JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem("aurafit_wishlist");
        }
    }
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    setWishlist,
    clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
