import { Link } from "react-router-dom";
import heroImage from "../assets/bg.jpg"

function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden">

            {/* Background Image */}
            <img
                src={heroImage}
                alt="AURAFIT sportswear campaign"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent"></div>
            {/* Hero Content */}
            <div className="absolute bottom-12 left-6 md:left-12 z-10 text-white">

                <p className="text-sm font-semibold tracking-widest mb-4">
                    AURAFIT PERFORMANCE
                </p>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                    BUILT TO MOVE.
                </h1>

                <p className="text-sm md:text-base mb-7 max-w-md">
                    Engineered for strength. Designed for movement.
                </p>

                <div className="flex flex-wrap gap-4">

                    <Link
                        to="/products"
                        className="bg-white text-black px-8 py-4 text-sm font-bold hover:bg-gray-200 transition"
                    >
                        SHOP MEN
                    </Link>

                    <Link
                        to="/products"
                        className="border border-white px-8 py-4 text-sm font-bold hover:bg-white hover:text-black transition"
                    >
                        EXPLORE COLLECTION
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default HeroSection;