import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getProducts } from "../services/productService"

function FeaturedProducts() {
    const { data: products, isPending, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })

    if (isPending) return <h2 className="text-center">Loading Products....</h2>
    if (isError) return <h2 className="text-center">failed to load products!</h2>

    const featuredProducts = products.filter((product) =>
        product.featured).slice(0, 4)
    

   
return (
    <section className="py-20 px-6 md:px-12 bg-[#FAF9F6]">

        <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-10">
                <p className="text-xs tracking-[0.2em] font-semibold text-gray-500">
                    TRAIN HARD. LOOK SHARP.
                </p>
                <h1 className="text-3xl md:text-4xl font-black mt-2">
                    BEST SELLERS
                </h1>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {featuredProducts.map((product) => (
                    <Link
                        to={`/products/${product.id}`}
                        key={product.id}
                        className="group"
                    >

                        {/* Image */}
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Details */}
                        <div className="mt-4">
                            <h2 className="text-sm md:text-base font-semibold">
                                {product.name}
                            </h2>

                            <p className="text-sm text-gray-600 mt-2">
                                ₹{product.price}
                            </p>
                        </div>

                    </Link>
                ))}

            </div>

            {/* View All */}
            <div className="text-center mt-12">
                <Link
                    to="/products"
                    className="inline-block border border-black px-10 py-4 text-sm font-bold hover:bg-black hover:text-white transition-colors"
                >
                    VIEW ALL PRODUCTS
                </Link>
            </div>

        </div>
    </section>
);

}

export default FeaturedProducts