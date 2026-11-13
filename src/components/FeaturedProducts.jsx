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
        product.featured.slice(0, 4)
    )

    return (
        <section>
            <div>
                <h1>BEST SELLING</h1>
                <p>TRAIN HARD. LOOK SHARP.</p>
            </div>

            <div>
                {featuredProducts.map((product) => (
                    <div key={product.id}>
                    

                    </div>
                ))}
            </div>


            <div>
                <Link to="/products">
                    VIEW ALL PRODUCTS
                </Link>
            </div>

        </section>
    )
}

export default FeaturedProducts