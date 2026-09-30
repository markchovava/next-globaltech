"use client"



interface PropInterface {
    type?: string,
    label?: string
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export default function TextInput({
    type = "text",
    label,
    name,
    value,
    placeholder,
    onChange,
    error = ""
}: PropInterface) {

    return (
        <div className="mb-4">
            {label &&
                <p className="font-medium text-sm text-gray-700 mb-1">
                    {label}:
                </p>
            }
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-3 py-2 rounded-lg outline-none border border-gray-300 
            focus:border-gray-500 ease-initial duration-200 transition-all`} />
            {error &&
                <p className="text-xs text-red-600 font-light">
                    {error}</p>
            }
        </div>
    )
}
