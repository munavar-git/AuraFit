import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { getUserOrders } from "../services/orderService";

function MyOrders() {
    const user = useSelector((state) => state.auth.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const data = await getUserOrders(user?.id);
                setOrders(data);
            } catch (err) {
                console.error("Failed to load orders:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <Navbar />

            <main className="max-w-5xl mx-auto py-12 px-6 md:px-12 w-full flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">MY ORDERS</h1>
                        <p className="text-gray-500 mt-1">Review your purchase history and order status</p>
                    </div>
                    {user && (
                        <div className="text-sm text-gray-500">
                            Signed in as <span className="font-semibold text-black">{user.email}</span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500">Retrieving orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-gray-400">
                            <i className="ri-file-list-3-line"></i>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No orders placed yet</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            When you place an order, you will be able to track its shipping status and details right here.
                        </p>
                        <Link
                            to="/products"
                            className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition"
                        >
                            START SHOPPING
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
                            >
                                {/* Order Card Header */}
                                <div className="bg-gray-50 p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-sm">
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div>
                                            <span className="text-xs uppercase text-gray-400 font-bold block">ORDER PLACED</span>
                                            <span className="font-semibold text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase text-gray-400 font-bold block">TOTAL</span>
                                            <span className="font-bold text-gray-900">
                                                ₹{order.total?.toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase text-gray-400 font-bold block">SHIP TO</span>
                                            <span className="font-semibold text-gray-900">{order.customerName}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-gray-500 font-bold">#{order.id}</span>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {order.status || "Confirmed"}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 divide-y divide-gray-100">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-20 object-cover rounded-lg bg-gray-100"
                                                />
                                                <div>
                                                    <Link to={`/products/${item.id}`} className="font-bold hover:underline">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Size: {item.size} • Qty: {item.quantity}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        ₹{item.price?.toLocaleString("en-IN")} each
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <span className="font-bold text-black text-sm">
                                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default MyOrders;
