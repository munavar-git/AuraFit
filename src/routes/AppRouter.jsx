import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/authentication/Login'
import Register from '../pages/authentication/Register'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
    </Routes>
  )
}

export default AppRouter