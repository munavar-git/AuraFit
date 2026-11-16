import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import { decreaseQuantity, increaseQuantity, removeItem } from "../redux/cartSlice";
function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return (
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-3xl font-extrabold text-center">
                Your Cart
            </h1>
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96">

                    <p className="text-gray-600  mb-2">Your cart is empty .</p>
                    <Link to="/products" className="text-white  bg-black py-2 px-4 rounded mt-30">Continue shopping</Link>
                </div>
            ) : (
                <div className="mt-12">

    {/* Table heading */}
    <div className="grid grid-cols-[1fr_120px_130px] 
                    border-b pb-4 text-sm text-gray-500">
        <p>Product</p>
        <p className="text-center">Quantity</p>
        <p className="text-right">Total</p>
    </div>

    {/* Cart products */}
    {cartItems.map((item) => (
        <div
            key={`${item.id}-${item.size}`}
            className="grid grid-cols-[1fr_120px_130px] 
                       gap-4 items-center border-b py-6"
        >

            {/* Product information */}
            <div className="flex items-center gap-6">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-36 object-cover"
                />

                <div className="space-y-2">
                    <Link to={`/products/${item.id}`}
                        className="font-semibold">
                        {item.name}
                    </Link>

                    <p className="text-sm text-gray-500">
                        Size: {item.size}
                    </p>

                    <p className="text-sm">
                        ₹{item.price.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => dispatch(decreaseQuantity({
                            id: item.id,
                            size: item.size
                        }))}
                    >
                        −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() => dispatch(increaseQuantity({
                            id: item.id,
                            size: item.size
                        }))}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => dispatch(removeItem({
                        id: item.id,
                        size: item.size
                    }))}
                    className="text-xs text-gray-400 underline"
                >
                    Remove
                </button>
            </div>

            {/* Subtotal */}
            <p className="text-right font-medium">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>

        </div>
    ))}
</div>

)}
<div className="max-w-xl mx-auto text-center mt-12">

    <h2 className="text-xl font-semibold mb-6">
        Order Total: ₹{total.toLocaleString("en-IN", {
            minimumFractionDigits: 2
        })}
    </h2>

   
    
    <button 
    onClick={() => console.log("Checkout clicked")}
    className="bg-black text-white rounded-2xl border-2 border-dashed hover:border-black hover:bg-white px-6 py-3 font-semibold 
    uppercase hover:text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] 
    hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] 
    active:rounded-2xl active:shadow-none ">
      SECURE CHECKOUT
    </button>
  



</div>


        </div>
    </>
    )
}

export default Cart