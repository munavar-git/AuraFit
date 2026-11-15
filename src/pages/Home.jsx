import NavBar from "../components/layout/NavBar" 
import HeroSection from "../components/home/HeroSection"
import CategorySection from "../components/home/CategorySection"
import FeaturedProducts from "../components/home/FeaturedProducts"
import BrandSection from "../components/home/BrandSection"
import Footer from "../components/layout/Footer"

function Home() {
  return (
    <div>
     <NavBar/>
     <HeroSection/>
     <CategorySection/>
     <FeaturedProducts/>
     <BrandSection/>
     <Footer/>
    </div>
  )
}

export default Home