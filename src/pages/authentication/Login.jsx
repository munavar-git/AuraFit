import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { loginUser } from "../../services/userServices";
import { loginSuccess } from "../../redux/authSlice";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const loggedInUser = await loginUser(formData.email, formData.password);
            dispatch(loginSuccess(loggedInUser));
            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] px-6">
            {/* Header */}
            <header className="flex items-center justify-between py-8 max-w-6xl mx-auto">
                <Link to="/" className="text-2xl font-black tracking-widest">
                    AURAFIT
                </Link>

                <p className="text-sm text-gray-600">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="ml-1 font-semibold text-black hover:underline"
                    >
                        Sign up →
                    </Link>
                </p>
            </header>

            {/* Login Content */}
            <main className="flex min-h-[75vh] items-center justify-center">
                <div className="w-full max-w-md text-center bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                        WELCOME BACK
                    </h1>

                    <div className="mx-auto my-6 h-px w-16 bg-black"></div>

                    <p className="mb-8 text-sm leading-relaxed text-gray-500">
                        Log in to track your orders, save your wishlist, and breeze through checkout.
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 text-left"
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
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <i className="ri-error-warning-line"></i> {error}
                            </div>
                        )}

                        <AuthButton disabled={isLoading}>
                            {isLoading ? "LOGGING IN..." : "LOG IN →"}
                        </AuthButton>
                    </form>

                    {/* Alternative */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-semibold">OR</span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <Link
                        to="/register"
                        className="block w-full rounded-full border border-gray-200 bg-gray-50 py-3.5 text-sm font-bold text-gray-800 transition hover:bg-gray-100"
                    >
                        CREATE AN ACCOUNT
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Login;
