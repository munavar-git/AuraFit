import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

function ProductDetails() {
    const [size, setSize] = useState("");
    const [addedNotice, setAddedNotice] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlistItems.some((item) => String(item.id) === String(id));

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading product details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <p className="text-red-500 font-bold text-lg mb-2">Product not found!</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 px-6 py-2.5 bg-black text-white rounded-full font-semibold"
                    >
                        Return to Products
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!size) return;
        dispatch(addToCart({ ...product, size }));
        setAddedNotice(true);
        setTimeout(() => setAddedNotice(false), 2500);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-6 md:px-12 w-full flex-1">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                    {/* Product Images Column */}
                    <div className="md:w-1/2">
                        <div className="aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3 mt-4">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-black cursor-pointer">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer opacity-70 hover:opacity-100 transition">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info Column */}
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                                    {product.category}
                                </span>
                                <button
                                    onClick={() => dispatch(toggleWishlist(product))}
                                    className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition ${
                                        isInWishlist ? "text-red-500 bg-red-50 border-red-200" : "text-gray-500 hover:text-black hover:border-black"
                                    }`}
                                    title={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                                >
                                    <i className={`${isInWishlist ? "ri-heart-fill" : "ri-heart-line"} text-xl`}></i>
                                </button>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black mt-2 tracking-tight text-gray-900">
                                {product.name}
                            </h1>

                            <p className="text-2xl font-extrabold text-black mt-4">
                                ₹{product.price?.toLocaleString("en-IN")}
                            </p>

                            <p className="text-gray-600 mt-6 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mt-4">
                                {product.stock <= 5 ? (
                                    <span className="text-red-600 font-bold text-sm flex items-center gap-1.5">
                                        <i className="ri-alarm-warning-line"></i> Only {product.stock} left in stock!
                                    </span>
                                ) : (
                                    <span className="text-emerald-700 font-semibold text-sm flex items-center gap-1.5">
                                        <i className="ri-checkbox-circle-line"></i> In Stock ({product.stock} available)
                                    </span>
                                )}
                            </div>

                            {/* Size Selector */}
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                                        Select Size
                                    </span>
                                    {!size && (
                                        <span className="text-xs text-amber-700 font-medium">
                                            Please choose a size
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    {["S", "M", "L", "XL"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSize(item)}
                                            className={`w-14 h-12 rounded-xl font-bold border transition-all ${
                                                size === item
                                                    ? "bg-black text-white border-black shadow-sm"
                                                    : "bg-white text-gray-800 border-gray-200 hover:border-black"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-10 pt-6 border-t border-gray-100">
                            {addedNotice && (
                                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
                                    <i className="ri-checkbox-circle-fill text-lg"></i> Added to your shopping bag!
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!size || product.stock <= 0}
                                    className="flex-1 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                                >
                                    <i className="ri-shopping-bag-line"></i>
                                    {size ? "Add to Cart" : "Select a Size"}
                                </button>
                                <button
                                    onClick={() => navigate("/cart")}
                                    className="px-8 py-4 bg-white text-black border-2 border-black rounded-full font-bold uppercase tracking-wider hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
                                >
                                    View Bag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ProductDetails;
