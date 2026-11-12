
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-0 left-0 z-20 w-full bg-transparent text-white px-6 md:px-12 py-5 hover:bg-[#FAF9F6]/95 hover:text-black transition-colors duration-300">
<div className="max-w-7xl mx-auto grid grid-cols-3 items-center">

    {/* Navigation */}
    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Shop</Link>
        <Link to="/products?category=men" className="hover:underline">Men</Link>
        <Link to="/products?category=women" className="hover:underline">Women</Link>
        <Link to="/products?category=accessories" className="hover:underline">Accessories</Link>
    </div>

    {/* Logo */}
    <Link to="/" className="text-2xl font-black tracking-[0.2em] justify-self-center">
        AURAFIT
    </Link>

    {/* Actions */}
    <div className="flex items-center justify-self-end gap-5 text-xl">

                    <button aria-label="Search" className="hover:scale-110 transition-transform">
                        <i className="ri-search-line"></i>
                    </button>

                    <Link to="/wishlist" aria-label="Wishlist" className="hover:scale-110 transition-transform">
                        <i className="ri-heart-line"></i>
                    </Link>

                    <Link to="/cart" aria-label="Cart" className="hover:scale-110 transition-transform">
                        <i className="ri-shopping-bag-line"></i>
                    </Link>

                    <Link to="/login" aria-label="Account" className="hover:scale-110 transition-transform">
                        <i className="ri-user-line"></i>
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
