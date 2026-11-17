import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

function Wishlist() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const handleMoveToCart = (product) => {
        dispatch(addToCart({ ...product, size: "M" }));
        dispatch(removeFromWishlist(product.id));
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <Navbar />
            
            <main className="max-w-7xl mx-auto py-16 px-6 md:px-12 w-full flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">MY WISHLIST</h1>
                        <p className="text-gray-500 mt-1">Saved items you love</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">
                        {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
                    </span>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-3xl text-gray-400">
                            <i className="ri-heart-line"></i>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 max-w-md mb-8">
                            Explore our high-performance gear and tap the heart icon to save your favorites for later.
                        </p>
                        <Link
                            to="/products"
                            className="bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition"
                        >
                            EXPLORE PRODUCTS
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <div
                                key={product.id}
                                className="group relative border border-gray-100 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                                    <Link to={`/products/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => dispatch(removeFromWishlist(product.id))}
                                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm transition"
                                        title="Remove from Wishlist"
                                    >
                                        <i className="ri-heart-fill text-lg"></i>
                                    </button>
                                </div>

                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                                            {product.category || "Fitness"}
                                        </span>
                                        <Link to={`/products/${product.id}`}>
                                            <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1 hover:underline">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-800 font-bold mt-2">
                                            ₹{product.price?.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                                        <button
                                            onClick={() => handleMoveToCart(product)}
                                            className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-1.5"
                                        >
                                            <i className="ri-shopping-bag-line"></i> Move to Cart
                                        </button>
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center"
                                            title="View Details"
                                        >
                                            <i className="ri-eye-line"></i>
                                        </Link>
                                    </div>
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

export default Wishlist;
