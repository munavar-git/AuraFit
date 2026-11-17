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
            disabled:opacity-50 hover:bg-gray-800 transition cursor-pointer"
        >
            {children}
        </button>
    );
}

export default AuthButton;
