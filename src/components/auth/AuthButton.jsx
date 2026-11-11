import { Children } from "react"

function AuthButton({
    children,
    disabled = false,
    type = "submit"
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full rounded-full bg-black py-4
            text-sm font-bold text-white
            disabled:opacity-50"
        >
            {children}
        </button>
    )
}

export default AuthButton