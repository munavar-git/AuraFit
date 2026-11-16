import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/productService"
import { useState } from "react"
import { useDispatch} from "react-redux"
import { addToCart } from "../redux/cartSlice"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/NavBar"
function ProductDetails() {
    const [size, setSize] = useState("")
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error occurred while fetching product details.</p>
    if (!product) return <p>Product not found!.</p>


    return (
        <section className="max-w-7xl mx-auto py-16 px-6  ">
            <Navbar/>
            <div className=" flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-100 aspect-[4/5] overflow-hidden
                         object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />

                    </div>
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-black mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-700 mb-6">₹{product.price}</p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <p className={product.stock <= 15 ? "text-red-400 font-bold mb-6" : "text-gray-600 mb-6"}>
                        Stock: {product.stock} left
                    </p>
                    <p className="font-semibold mb-4">Size |</p>
                    <div className="flex gap-4 mb-8">
                        {["S", "M", "L", "XL"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setSize(item)}
                                className={`px-4 py-2 border rounded transition ${size === item
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black hover:bg-gray-100"
                                    }`}>
                                {item}

                            </button>

                        ))}
                    </div>

                    <button
                        onClick={() => dispatch(addToCart({ ...product, size }))}
                        disabled={!size || product.stock <= 0}                        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition 
                          disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700">
                        Add to Cart
                    </button>
                    <button
    onClick={() => navigate("/cart")}
    className="px-6 py-3 bg-white text-black border border-black rounded hover:bg-gray-100 transition"
>
    Go to Cart
</button>
                 
                </div>
            </div>

        </section>
    )
}



export default ProductDetails