function AuthInput({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    autoComplete,
    required
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>

            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className="w-full border border-gray-300 outline-none rounded-lg px-4 py-3 focus:border-black"
                required={required}
            />
            <p>hihihnhiuSUk,i <</p>
        </div>
    )
}

export default AuthInput