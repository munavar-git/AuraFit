import axios from "axios";

const api_url = "http://localhost:3000/orders";

export async function createOrder(orderData) {
    try {
        const response = await axios.post(api_url, orderData);
        // Also persist locally as backup
        const existingOrders = JSON.parse(localStorage.getItem("aurafit_orders") || "[]");
        existingOrders.unshift(response.data);
        localStorage.setItem("aurafit_orders", JSON.stringify(existingOrders));
        return response.data;
    } catch (error) {
        console.warn("Server unavailable, storing order locally:", error.message);
        const fallbackOrder = {
            ...orderData,
            id: orderData.id || "ORD-" + Math.floor(100000 + Math.random() * 900000),
            createdAt: new Date().toISOString()
        };
        const existingOrders = JSON.parse(localStorage.getItem("aurafit_orders") || "[]");
        existingOrders.unshift(fallbackOrder);
        localStorage.setItem("aurafit_orders", JSON.stringify(existingOrders));
        return fallbackOrder;
    }
}

export async function getUserOrders(userId) {
    try {
        const response = await axios.get(api_url);
        const allOrders = response.data;
        if (!userId) return allOrders;
        return allOrders.filter(order => order.userId === userId);
    } catch (error) {
        console.warn("Could not fetch orders from server, using local storage:", error.message);
        const existingOrders = JSON.parse(localStorage.getItem("aurafit_orders") || "[]");
        if (!userId) return existingOrders;
        return existingOrders.filter(order => order.userId === userId);
    }
}
