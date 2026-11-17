import axios from "axios";

const api_url = "http://localhost:3000/users";

export async function getWishlist(userId) {
    try {
        const { data: user } = await axios.get(`${api_url}/${userId}`);
        return Array.isArray(user?.wishlist) ? user.wishlist : [];
    } catch (error) {
        console.warn("Could not fetch remote wishlist:", error.message);
        return [];
    }
}

export async function addToWishlist(userId, productId) {
    try {
        const { data: user } = await axios.get(`${api_url}/${userId}`);
        const currentWishlist = Array.isArray(user?.wishlist) ? user.wishlist : [];

        if (currentWishlist.includes(productId)) {
            return currentWishlist;
        }

        const updatedWishlist = [...currentWishlist, productId];
        const response = await axios.patch(`${api_url}/${userId}`, {
            wishlist: updatedWishlist
        });

        return response.data?.wishlist || updatedWishlist;
    } catch (error) {
        console.warn("Could not sync wishlist with server:", error.message);
        return [productId];
    }
}

export async function removeFromWishlist(userId, productId) {
    try {
        const { data: user } = await axios.get(`${api_url}/${userId}`);
        const currentWishlist = Array.isArray(user?.wishlist) ? user.wishlist : [];

        const updatedWishlist = currentWishlist.filter(id => String(id) !== String(productId));
        const response = await axios.patch(`${api_url}/${userId}`, {
            wishlist: updatedWishlist
        });

        return response.data?.wishlist || updatedWishlist;
    } catch (error) {
        console.warn("Could not remove from server wishlist:", error.message);
        return [];
    }
}
