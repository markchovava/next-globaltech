"use client"



interface PropInterface {
    label?: string
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error?: string
}

export default function TextArea({
    label,
    name,
    value,
    placeholder,
    onChange,
    error = ""
}: PropInterface) {

    return (
        <div className="mb-4">
            <p className="font-medium text-sm text-gray-700 mb-1">{label}:</p>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full h-30 px-3 py-2 rounded-lg outline-none border border-gray-300 
            focus:border-gray-500 ease-initial duration-200 transition-all`} />
            {error &&
                <p className="text-xs text-red-600 font-light">
                    {error}</p>
            }
        </div>
    )
}
