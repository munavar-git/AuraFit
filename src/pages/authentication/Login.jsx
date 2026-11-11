import { useState } from "react"
import { Link } from "react-router-dom"
import AuthInput from "../../components/auth/AuthInput"
import AuthButton from "../../components/auth/AuthButton"
import { loginUser } from "../../services/userServices"
import { formToJSON } from "axios"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [isloading, setIsLoading] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
           const loggedInUser= await loginUser(formData.email, formData.password)
           console.log("Login successfully",loggedInUser)
        } catch (error) {
            setError(error.message)
        }
        finally {
            setIsLoading(false)
        }

    }


    return (
        <div className="min-h-screen bg-[#FAF9F6] px-6">

            {/* Header */}
            <header className="flex items-center justify-between py-8">
                <p className="text-2xl font-bold tracking-tight">
                    AURAFIT
                </p>

                <p className="text-sm text-gray-600">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="ml-1 font-semibold text-black"
                    >
                        Sign up →
                    </Link>
                </p>
            </header>

            {/* Login Content */}
            <main className="flex min-h-[75vh] items-center justify-center">

                <div className="w-full max-w-md text-center">

                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                        WELCOME BACK
                    </h1>

                    <div className="mx-auto my-7 h-px w-20 bg-black "></div>

                    <p className="mb-8 text-sm leading-6 text-gray-500">
                        Log in to track your orders, save your
                        wishlist and breeze through checkout.
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 text-left"
                    >

                        <AuthInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                        <AuthInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}
                        <AuthButton>
                            LOG IN →
                        </AuthButton>

                    </form>

                    {/* Alternative */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <Link
                        to="/register"
                        className="block w-full rounded-full border border-gray-300 bg-gray-100 py-4 text-sm font-bold transition hover:bg-gray-200"
                    >
                        SIGN UP
                    </Link>


                </div>
            </main>
        </div>
    )
}

export default Login


