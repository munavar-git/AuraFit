import NavBar from "../components/NavBar" 
import HeroSection from "../components/HeroSection"
import CategorySection from "../components/CategorySection"
import FeaturedProducts from "../components/FeaturedProducts"
import BrandSection from "../components/BrandSection"

function Home() {
  return (
    <div>
     <NavBar/>
     <HeroSection/>
     <FeaturedProducts/>
     <CategorySection/>
     <BrandSection/>
    </div>
  )
}

export default Home