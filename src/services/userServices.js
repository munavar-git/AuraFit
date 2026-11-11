import axios from "axios";

const api_url = "http://localhost:3000/users"

export async function registerUser(userData) {
    const { data: existingUser } = await axios.get(api_url,
        {
            params: {
                email: userData.email
            }
        })
    if (existingUser.length > 0) {
        throw new Error("Email already registered")
    }
    const { confirmPassword, ...user } = userData
    const response = await axios.post(api_url, user)
    return response.data
}

export async function loginUser(email, password) {
    const {data:users}=await axios.get(api_url,{
        params:{
            email:email
        }
    })
if(users.length===0){
    throw new Error("invalid email or password")
}

const user=users[0]
if(user.password!==password){
    throw new Error("invalid password or email")
}
return user

};