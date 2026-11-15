
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black text-white px-6 md:px-12 py-16">

            <div className="max-w-7xl mx-auto">

                {/* Brand */}
                <div>
                    <h2 className="text-3xl font-black tracking-widest">
                        AURAFIT
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Built to move. Designed to perform.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-12">

                    <div>
                        <h3 className="font-bold mb-4">SHOP</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/products">All Products</Link></li>
                            <li><Link to="/products?category=men">Men</Link></li>
                            <li><Link to="/products?category=women">Women</Link></li>
                            <li><Link to="/products?category=accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">SUPPORT</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>Contact Us</li>
                            <li>Shipping Policy</li>
                            <li>Returns</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">FOLLOW US</h3>
                        <p className="text-gray-400">Instagram</p>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-12 pt-6 text-sm text-gray-400">
                    © 2026 AURAFIT. All rights reserved.
                </div>

            </div>

        </footer>
    );
}

export default Footer;
