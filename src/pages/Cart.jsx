import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { decreaseQuantity, increaseQuantity, removeItem } from "../redux/cartSlice";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto py-16 px-6 md:px-12 w-full flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tight mb-4">
                    Your Shopping Bag
                </h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-3xl text-gray-400">
                            <i className="ri-shopping-bag-line"></i>
                        </div>
                        <p className="text-xl font-bold text-gray-800 mb-2">Your bag is empty</p>
                        <p className="text-gray-500 mb-8 max-w-sm">Items added to your shopping bag will appear here.</p>
                        <Link
                            to="/products"
                            className="text-white bg-black py-3.5 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8">
                        {/* Table heading */}
                        <div className="grid grid-cols-[1fr_120px_130px] border-b border-gray-200 pb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <p>Product</p>
                            <p className="text-center">Quantity</p>
                            <p className="text-right">Total</p>
                        </div>

                        {/* Cart products */}
                        <div className="divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.id}-${item.size}`}
                                    className="grid grid-cols-[1fr_120px_130px] gap-4 items-center py-6"
                                >
                                    {/* Product information */}
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-32 object-cover rounded-lg bg-gray-50"
                                        />

                                        <div className="space-y-1.5">
                                            <Link
                                                to={`/products/${item.id}`}
                                                className="font-bold text-gray-900 hover:underline line-clamp-1"
                                            >
                                                {item.name}
                                            </Link>

                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Size: {item.size}
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800">
                                                ₹{item.price.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1">
                                            <button
                                                onClick={() => dispatch(decreaseQuantity({
                                                    id: item.id,
                                                    size: item.size
                                                }))}
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold"
                                            >
                                                −
                                            </button>

                                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>

                                            <button
                                                onClick={() => dispatch(increaseQuantity({
                                                    id: item.id,
                                                    size: item.size
                                                }))}
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeItem({
                                                id: item.id,
                                                size: item.size
                                            }))}
                                            className="text-xs text-red-500 hover:text-red-700 underline"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Subtotal */}
                                    <p className="text-right font-bold text-gray-900">
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Checkout Bar */}
                        <div className="max-w-xl mx-auto text-center mt-12 p-8 border border-gray-100 rounded-2xl bg-[#FAF9F6]">
                            <h2 className="text-2xl font-black mb-2">
                                Order Total: ₹{total.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2
                                })}
                            </h2>
                            <p className="text-xs text-gray-500 mb-6">Taxes included. Free delivery on orders over ₹1,500.</p>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full sm:w-auto bg-black text-white rounded-full px-10 py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 shadow-md text-sm"
                            >
                                PROCEED TO CHECKOUT →
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Cart;
