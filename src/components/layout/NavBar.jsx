import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartCount = useSelector((state) =>
        state.cart.items.reduce(
            (total, item) => total + item.quantity,
            0
        )
    );

    const wishlistCount = useSelector((state) => state.wishlist.items.length);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white text-black">
            {/* Announcement bar */}
            <div className="bg-black text-white text-center py-2 text-xs tracking-wider font-semibold">
                TRAIN HARD. LIVE STRONG. MOVE BETTER.
            </div>

            {/* Main Navbar */}
            <nav className="border-b border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 grid grid-cols-3 items-center">

                    {/* Left: Desktop Navigation & Mobile Hamburger Button */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open mobile menu"
                            className="md:hidden text-2xl p-2 -ml-2 text-black hover:text-gray-600 transition"
                        >
                            <i className="ri-menu-line"></i>
                        </button>

                        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
                            <Link to="/" className="hover:text-gray-500 transition-colors">
                                Home
                            </Link>

                            {/* Explore Fits Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 py-6 hover:text-gray-500 transition-colors">
                                    Explore Fits
                                    <i className="ri-arrow-down-s-line text-base"></i>
                                </button>

                                <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 py-2">
                                    <Link
                                        to="/products"
                                        className="block px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
                                    >
                                        All Products
                                    </Link>
                                    <Link
                                        to="/products?category=men"
                                        className="block px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
                                    >
                                        Men's Fits
                                    </Link>
                                    <Link
                                        to="/products?category=women"
                                        className="block px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
                                    >
                                        Women's Fits
                                    </Link>
                                    <Link
                                        to="/products?category=accessories"
                                        className="block px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
                                    >
                                        Accessories
                                    </Link>
                                </div>
                            </div>

                            <Link to="/products" className="hover:text-gray-500 transition-colors">
                                Collection
                            </Link>
                        </div>
                    </div>

                    {/* Center: Brand Logo */}
                    <Link
                        to="/"
                        className="justify-self-center text-2xl md:text-3xl font-black tracking-[0.25em] text-black"
                    >
                        AURAFIT
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-self-end gap-5 text-xl">
                        {/* Wishlist Link with Badge */}
                        <Link
                            to="/wishlist"
                            aria-label={`Wishlist, ${wishlistCount} items`}
                            className="relative hover:text-gray-600 transition"
                        >
                            <i className="ri-heart-line"></i>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2.5 bg-black text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart Link with Badge */}
                        <Link
                            to="/cart"
                            aria-label={`Shopping bag, ${cartCount} items`}
                            className="relative hover:text-gray-600 transition"
                        >
                            <i className="ri-shopping-bag-line"></i>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2.5 bg-black text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Account / Auth Dropdown */}
                        <div className="relative">
                            {isAuthenticated && user ? (
                                <div>
                                    <button
                                        onClick={() => setIsUserMenuOpen(prev => !prev)}
                                        className="flex items-center gap-1 hover:text-gray-600 transition focus:outline-none"
                                        aria-label="User profile menu"
                                    >
                                        <i className="ri-user-smile-line text-2xl text-black"></i>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-sm">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-xs text-gray-400 uppercase font-semibold">Signed in as</p>
                                                <p className="font-bold text-gray-900 truncate">{user.name || user.email}</p>
                                            </div>
                                            <Link
                                                to="/orders"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-50 font-medium"
                                            >
                                                <i className="ri-file-list-3-line mr-2"></i> My Orders
                                            </Link>
                                            <Link
                                                to="/wishlist"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-50 font-medium"
                                            >
                                                <i className="ri-heart-line mr-2"></i> Wishlist ({wishlistCount})
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium border-t border-gray-100 flex items-center"
                                            >
                                                <i className="ri-logout-box-r-line mr-2"></i> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    aria-label="Sign in"
                                    className="hover:text-gray-600 transition"
                                >
                                    <i className="ri-user-line"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Drawer Content */}
                    <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
                        <div>
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <span className="text-xl font-black tracking-widest">AURAFIT</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl text-gray-500 hover:text-black p-1"
                                    aria-label="Close menu"
                                >
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>

                            {/* User Info Bar if logged in */}
                            {isAuthenticated && user && (
                                <div className="py-4 border-b border-gray-100">
                                    <p className="text-xs text-gray-400 font-semibold uppercase">Hello,</p>
                                    <p className="text-base font-bold text-black truncate">{user.name || user.email}</p>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <div className="flex flex-col py-6 space-y-4 text-base font-bold uppercase tracking-wider">
                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    All Products
                                </Link>
                                <Link
                                    to="/products?category=men"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    Men's Collection
                                </Link>
                                <Link
                                    to="/products?category=women"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    Women's Collection
                                </Link>
                                <Link
                                    to="/products?category=accessories"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    Accessories
                                </Link>
                                <Link
                                    to="/wishlist"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition flex items-center justify-between"
                                >
                                    <span>Wishlist</span>
                                    {wishlistCount > 0 && (
                                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/cart"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition flex items-center justify-between"
                                >
                                    <span>Shopping Bag</span>
                                    {cartCount > 0 && (
                                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/orders"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-gray-500 transition"
                                >
                                    My Orders
                                </Link>
                            </div>
                        </div>

                        {/* Drawer Bottom Auth Section */}
                        <div className="pt-6 border-t border-gray-100">
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                                >
                                    <i className="ri-logout-box-r-line"></i> Sign Out
                                </button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-3 bg-black text-white font-bold rounded-xl text-center uppercase tracking-wider text-sm"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-3 border border-black text-black font-bold rounded-xl text-center uppercase tracking-wider text-sm"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
