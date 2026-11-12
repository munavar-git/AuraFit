import HeroSection from "./components/HeroSection"
import NavBar from "./components/NavBar"
import Register from "./pages/authentication/Register"

// import AppRouter from './routes/AppRouter'
function App() {
 return (
     <>
     {/* <AppRouter/> */}
     
     <NavBar/>
     <HeroSection/>
     <Register/>
    </>
  )
}

export default App