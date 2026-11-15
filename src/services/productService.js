import axios from "axios"
export async function getProducts(){
    const response=await axios.get("http://localhost:3000/products")
    return response.data
}

export async function getProductById(id){
    const response=await axios.get(`http://localhost:3000/products/${id}`)
    return response.data
}