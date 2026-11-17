import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { clearCart } from "../redux/cartSlice";
import { createOrder } from "../services/orderService";

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal > 1500 ? 0 : 99;
    const finalTotal = subtotal + shippingFee;

    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        paymentMethod: "cod"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setError("");

        if (cartItems.length === 0) {
            setError("Your cart is empty. Please add items before checking out.");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderPayload = {
                id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
                userId: user?.id || "guest",
                customerName: formData.fullName,
                customerEmail: formData.email,
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    phone: formData.phone
                },
                items: cartItems,
                subtotal,
                shippingFee,
                total: finalTotal,
                paymentMethod: formData.paymentMethod,
                status: "Processing",
                createdAt: new Date().toISOString()
            };

            const savedOrder = await createOrder(orderPayload);
            dispatch(clearCart());
            setOrderSuccess(savedOrder);
        } catch (err) {
            setError(err.message || "Something went wrong while placing your order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-white">
                <Navbar />
                <main className="max-w-2xl mx-auto py-20 px-6 text-center flex-1">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        <i className="ri-check-line font-black"></i>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        THANK YOU FOR YOUR ORDER!
                    </h1>

                    <p className="text-gray-600 mt-3 text-base">
                        Your order has been placed successfully and is being prepared.
                    </p>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 my-8 text-left max-w-lg mx-auto">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-sm">
                            <span className="text-gray-500">Order ID:</span>
                            <span className="font-mono font-bold text-black">{orderSuccess.id}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 text-sm">
                            <span className="text-gray-500">Recipient:</span>
                            <span className="font-medium text-black">{orderSuccess.customerName}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 text-sm">
                            <span className="text-gray-500">Payment:</span>
                            <span className="uppercase font-semibold text-black">{orderSuccess.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 text-base font-bold">
                            <span>Amount Paid:</span>
                            <span className="text-black">₹{orderSuccess.total?.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/orders"
                            className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition"
                        >
                            VIEW MY ORDERS
                        </Link>
                        <Link
                            to="/products"
                            className="border border-black text-black px-8 py-3.5 rounded-full font-bold hover:bg-black hover:text-white transition"
                        >
                            CONTINUE SHOPPING
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-white">
                <Navbar />
                <main className="max-w-4xl mx-auto py-24 px-6 text-center flex-1">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-gray-400">
                        <i className="ri-shopping-cart-line"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Add gear to your bag before heading to checkout.</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition"
                    >
                        EXPLORE PRODUCTS
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6]">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-6 md:px-12 w-full flex-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-8">
                    SECURE CHECKOUT
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <form onSubmit={handleSubmitOrder} className="lg:col-span-7 flex flex-col gap-8">
                        {/* Delivery Address */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                                <i className="ri-map-pin-line text-xl"></i> Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Alex Johnson"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@example.com"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Flat / House No., Landmark, Street"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Mumbai"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Maharashtra"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-600 mb-2">
                                        PIN Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="400001"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                                <i className="ri-bank-card-line text-xl"></i> Payment Method
                            </h2>

                            <div className="flex flex-col gap-3">
                                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
                                    formData.paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                                }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black accent-black"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</p>
                                        <p className="text-xs text-gray-500">Pay conveniently with cash or UPI at your doorstep</p>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
                                    formData.paymentMethod === "upi" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                                }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="upi"
                                        checked={formData.paymentMethod === "upi"}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black accent-black"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">UPI / Google Pay / PhonePe</p>
                                        <p className="text-xs text-gray-500">Instant online transfer via UPI QR or ID</p>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
                                    formData.paymentMethod === "card" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                                }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === "card"}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black accent-black"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Credit / Debit Card</p>
                                        <p className="text-xs text-gray-500">Visa, MasterCard, RuPay, Amex</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition disabled:opacity-50 shadow-lg text-base"
                        >
                            {isSubmitting ? "PROCESSING ORDER..." : `PLACE ORDER • ₹${finalTotal.toLocaleString("en-IN")}`}
                        </button>
                    </form>

                    {/* Order Summary Column */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 sticky top-28">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
                                Order Summary ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                            </h2>

                            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 py-2 border-b border-gray-50">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-20 object-cover rounded-lg bg-gray-50"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-black mt-1">
                                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2.5 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                                </div>
                                <div className="flex justify-between text-base font-extrabold text-black pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 leading-relaxed flex items-start gap-2.5">
                                <i className="ri-shield-check-line text-lg text-emerald-600"></i>
                                <span>
                                    All orders are backed by AURAFIT's 14-day hassle-free return and exchange guarantee.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Checkout;
