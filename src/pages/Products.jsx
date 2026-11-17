import { getProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { toggleWishlist } from "../redux/wishlistSlice";

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState("default");
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const categoryParam = searchParams.get("category");
    const category = categoryParam ? categoryParam.toLowerCase() : "all";

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    const handleCategoryChange = (selectedCategory) => {
        const nextParams = new URLSearchParams(searchParams);
        if (selectedCategory === "all") {
            nextParams.delete("category");
        } else {
            nextParams.set("category", selectedCategory);
        }
        setSearchParams(nextParams);
    };

    const isItemInWishlist = (id) => {
        return wishlistItems.some((item) => String(item.id) === String(id));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading collection...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <p className="text-red-500 font-semibold mb-2">Error loading products.</p>
                    <p className="text-gray-500 text-sm">Please make sure the json-server mock database is running.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const filteredProducts = category === "all"
        ? products
        : products.filter(product => product.category?.toLowerCase() === category);

    const sortedProducts = [...filteredProducts];
    if (sort === "price-low-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "name-a-z") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    const categories = [
        { label: "All", value: "all" },
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Accessories", value: "accessories" }
    ];

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 w-full flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">OUR COLLECTION</h1>
                        <p className="text-gray-500 mt-1">High-performance gear engineered to move</p>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">{filteredProducts.length} products</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategoryChange(cat.value)}
                                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                                    category === cat.value
                                        ? "bg-black text-white shadow-sm"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-xs uppercase font-bold tracking-wider text-gray-500">
                            Sort By:
                        </label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-black bg-white"
                        >
                            <option value="default">Default</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="name-a-z">Name: A to Z</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <i className="ri-inbox-line text-5xl text-gray-300 mb-4 block"></i>
                        <p className="text-gray-600 font-medium">No products found for the selected category.</p>
                        <button
                            onClick={() => handleCategoryChange("all")}
                            className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition"
                        >
                            Reset Category
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {sortedProducts.map((product) => {
                            const inWishlist = isItemInWishlist(product.id);
                            return (
                                <div
                                    key={product.id}
                                    className="group relative border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="relative aspect-3/4 overflow-hidden bg-gray-50">
                                        <Link to={`/products/${product.id}`}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
                                        <button
                                            onClick={() => dispatch(toggleWishlist(product))}
                                            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition shadow-md ${
                                                inWishlist
                                                    ? "bg-white text-red-500"
                                                    : "bg-white/90 text-gray-700 hover:text-red-500 hover:bg-white"
                                            }`}
                                            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                        >
                                            <i className={`${inWishlist ? "ri-heart-fill" : "ri-heart-line"} text-xl`}></i>
                                        </button>
                                        {product.stock <= 5 && product.stock > 0 && (
                                            <span className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                Only {product.stock} left
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1 justify-between">
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                                {product.category}
                                            </span>
                                            <Link to={`/products/${product.id}`}>
                                                <h2 className="text-lg font-bold text-gray-900 mt-1 hover:underline line-clamp-1">
                                                    {product.name}
                                                </h2>
                                            </Link>
                                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                                            <span className="text-lg font-extrabold text-black">
                                                ₹{product.price?.toLocaleString("en-IN")}
                                            </span>
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="text-xs font-bold uppercase tracking-wider text-black hover:text-gray-600 flex items-center gap-1"
                                            >
                                                View Fit <i className="ri-arrow-right-line"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Products;
