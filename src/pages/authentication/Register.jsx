
import { useState } from "react"
import AuthInput from "../../components/auth/AuthInput"
import AuthButton from "../../components/auth/AuthButton"
import { Link } from "react-router-dom"
import { registerUser } from "../../services/userServices"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setIsLoading(true)
        try {

           let newUser= await registerUser(formData)
           console.log('registered successfull',newUser)
        } catch (error) {
            setError(error.message)
        }
        finally {
            setIsLoading(false)
        }


    }

    return (

        <div className="min-h-screen bg-[#FAF9F6] px-6">
            <header className="flex items-center justify-between py-8">
                <p className="text-2xl font-bold tracking-tight">
                    AURAFIT
                </p>

                <p className="text-sm text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-1 font-semibold text-black"
                    >
                        Login →
                    </Link>
                </p>
            </header>
            <main className="flex min-h-[75vh] items-center justify-center">
                <div className="w-full max-w-md space-y-6">

                    <div className="text-center">


                        <h1 className="text-4xl font-bold ">
                            JOIN AURAFIT
                        </h1>
                        <p className="text-gray-500 ">
                            Create your account and take the first
                            step toward comfortable everyday movement.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <AuthInput
                            label="Full Name"
                            name="name"
                            placeholder="eg.John Pork"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />

                        <AuthInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                        <AuthInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />

                        <AuthInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />

                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}

                        <AuthButton disabled={isloading}>{isloading?"CREATING ACCOUNT...":"CREATE ACCOUNT"}</AuthButton>

                    </form>



                </div>
            </main>
        </div>
    )

}

export default Register
