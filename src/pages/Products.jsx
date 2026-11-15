import { getProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useState } from "react";

function Products() {
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error occurred while fetching products.</div>

    const filteredProducts = category === "all" ? products : products.filter(product => product.category === category);

    const sortedProducts = [...filteredProducts];
    if (sort === "price-low-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-high-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="max-w-7xl mx-auto py-20 px-6 md:px-30 ">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
                <h1 className="text-3xl md:text-4xl font-black mb-10">OUR COLLECTION</h1>
                <p className="text-gray-600 mb-6">{filteredProducts.length} products </p>
            </div>
            <div className="flex gap-4 mb-6">
                <button onClick={() => setCategory("all")}
                    className={`px-4 py-2 border rounded transition ${category === "all"
                            ? "bg-black text-white"
                            : "text-black hover:bg-black hover:text-white"
                        }`}>
                    All
                </button>
                <button onClick={() => setCategory("men")}
                    className={`px-4 py-2 border rounded transition ${category === "men"
                            ? "bg-black text-white"
                            : "text-black hover:bg-black hover:text-white"
                        }`}>
                    Men
                </button>
                <button onClick={() => setCategory("women")}
                    className={`px-4 py-2 border rounded transition ${category === "women"
                            ? "bg-black text-white"
                            : "text-black hover:bg-black hover:text-white"
                        }`}>
                    Women
                </button>
                <button onClick={() => setCategory("accessories")}
                    className={`px-4 py-2 border rounded transition ${category === "accessories"
                            ? "bg-black text-white"
                            : "text-black hover:bg-black hover:text-white"
                        }`}>
                    Accessories
                </button>

                <div className="items-right gap-2 ml-auto">
                    <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-4 py-2">
                        <option value="default">Default</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="name-a-z">Name: A to Z</option>
                    </select>

                </div>
            </div>




            {filteredProducts.length === 0 ? (
                <p className="text-center py-12 text-gray-500">
                    No products found for the selected category.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                        <Link
                            to={`/products/${product.id}`}
                            key={product.id}
                            className="border rounded p-4"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover mb-4"
                            />
                            <h2 className="text-lg font-semibold mb-2">
                                {product.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                ₹{product.price}
                            </p>
                        </Link>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Products;