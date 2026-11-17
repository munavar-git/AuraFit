import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { registerUser } from "../../services/userServices";
import { loginSuccess } from "../../redux/authSlice";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const newUser = await registerUser(formData);
            dispatch(loginSuccess(newUser));
            navigate("/");
        } catch (err) {
            setError(err.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] px-6">
            <header className="flex items-center justify-between py-8 max-w-6xl mx-auto">
                <Link to="/" className="text-2xl font-black tracking-widest">
                    AURAFIT
                </Link>

                <p className="text-sm text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-1 font-semibold text-black hover:underline"
                    >
                        Login →
                    </Link>
                </p>
            </header>

            <main className="flex min-h-[75vh] items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                            JOIN AURAFIT
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            Create your account to unlock order tracking and personalized gear recommendations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <AuthInput
                            label="Full Name"
                            name="name"
                            placeholder="e.g. Alex Morgan"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />

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
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <i className="ri-error-warning-line"></i> {error}
                            </div>
                        )}

                        <AuthButton disabled={isLoading}>
                            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                        </AuthButton>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Register;
