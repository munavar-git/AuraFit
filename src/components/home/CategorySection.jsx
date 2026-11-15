import womenImg from "../../assets/2.svg"
import manImg from "../../assets/1.svg"
import accessory from "../../assets/3.svg"


import { Link } from "react-router-dom"
function CategorySection() {
    return (
        <section className="inset-0 py-20 px-6 md:px-30 bg-blend-multiply bg-[#FAF9F6] ">

            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-sm tracking-widest font-semibold">EXPLORE AURAFIT</h1>
                <p className="text-3xl md:text-4xl font-black mt-2">Shop by category</p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 ">

                <Link
                    to="/products?category=men"
                    className="group relative h-105 overflow-hidden"
                >
                    <img
                        src={manImg}
                        alt="Men's sportswear"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                    <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
                        MEN
                    </h2>
                </Link>


                <Link
                    to="/products?category=women"
                    className="group relative h-105 overflow-hidden"
                >
                    <img
                        src={womenImg}
                        alt="Women's sportswear"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                    <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
                        WOMEN
                    </h2>
                </Link>
                <Link
                    to="/products?category=accessories"
                    className="group relative h-105 overflow-hidden"
                >
                    <img
                        src={accessory}
                        alt="Fitness accessories"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                    <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
                        ACCESSORIES
                    </h2>
                </Link>
            </div>
        </section>
    )
}

export default CategorySection